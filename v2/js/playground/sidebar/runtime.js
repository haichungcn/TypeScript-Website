define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let allLogs = '';
    exports.runPlugin = () => {
        const plugin = {
            id: 'logs',
            displayName: 'Logs',
            willMount: (sandbox, container) => {
                if (allLogs.length === 0) {
                    const noErrorsMessage = document.createElement('div');
                    noErrorsMessage.id = 'empty-message-container';
                    container.appendChild(noErrorsMessage);
                    const message = document.createElement('div');
                    message.textContent = 'No logs';
                    message.classList.add('empty-plugin-message');
                    noErrorsMessage.appendChild(message);
                }
                const errorUL = document.createElement('div');
                errorUL.id = 'log-container';
                container.appendChild(errorUL);
                const logs = document.createElement('div');
                logs.id = 'log';
                logs.innerHTML = allLogs;
                errorUL.appendChild(logs);
            },
        };
        return plugin;
    };
    exports.runWithCustomLogs = (closure) => {
        const noLogs = document.getElementById('empty-message-container');
        if (noLogs) {
            noLogs.style.display = 'none';
        }
        rewireLoggingToElement(() => document.getElementById('log'), () => document.getElementById('log-container'), closure, true);
    };
    // Thanks SO: https://stackoverflow.com/questions/20256760/javascript-console-log-to-html/35449256#35449256
    function rewireLoggingToElement(eleLocator, eleOverflowLocator, closure, autoScroll) {
        fixLoggingFunc('log', 'LOG');
        fixLoggingFunc('debug', 'DBG');
        fixLoggingFunc('warn', 'WRN');
        fixLoggingFunc('error', 'ERR');
        fixLoggingFunc('info', 'INF');
        closure.then(js => {
            eval(js);
            allLogs = allLogs + '<hr />';
            undoLoggingFunc('log');
            undoLoggingFunc('debug');
            undoLoggingFunc('warn');
            undoLoggingFunc('error');
            undoLoggingFunc('info');
        });
        function undoLoggingFunc(name) {
            // @ts-ignore
            console[name] = console['old' + name];
        }
        function fixLoggingFunc(name, id) {
            // @ts-ignore
            console['old' + name] = console[name];
            // @ts-ignore
            console[name] = function (...objs) {
                const output = produceOutput(objs);
                const eleLog = eleLocator();
                const prefix = '[<span class="log-' + name + '">' + id + '</span>]: ';
                const eleContainerLog = eleOverflowLocator();
                allLogs = allLogs + prefix + output + '<br>';
                if (eleLog && eleContainerLog) {
                    if (autoScroll) {
                        const atBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                        eleLog.innerHTML = allLogs;
                        if (atBottom)
                            eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                    }
                    else {
                        eleLog.innerHTML = allLogs;
                    }
                }
                // @ts-ignore
                console['old' + name].apply(undefined, objs);
            };
        }
        function produceOutput(args) {
            return args.reduce((output, arg, index) => {
                const isObj = typeof arg === 'object';
                let textRep = '';
                if (arg && arg.stack && arg.message) {
                    // special case for err
                    textRep = arg.message;
                }
                else if (isObj) {
                    textRep = JSON.stringify(arg, null, 2);
                }
                else {
                    textRep = arg;
                }
                const showComma = index !== args.length - 1;
                const comma = showComma ? "<span class='comma'>, </span>" : '';
                return output + textRep + comma + '&nbsp;';
            }, '');
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BsYXlncm91bmQvc3JjL3NpZGViYXIvcnVudGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFSCxRQUFBLFNBQVMsR0FBRyxHQUFHLEVBQUU7UUFDNUIsTUFBTSxNQUFNLEdBQXFCO1lBQy9CLEVBQUUsRUFBRSxNQUFNO1lBQ1YsV0FBVyxFQUFFLE1BQU07WUFDbkIsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUNoQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUN4QixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNyRCxlQUFlLENBQUMsRUFBRSxHQUFHLHlCQUF5QixDQUFBO29CQUM5QyxTQUFTLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO29CQUV0QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUM3QyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtvQkFDL0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtvQkFDN0MsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDckM7Z0JBRUQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDN0MsT0FBTyxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUE7Z0JBQzVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBRTlCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzFDLElBQUksQ0FBQyxFQUFFLEdB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c0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWdyb3VuZFBsdWdpbiB9IGZyb20gJy4uJ1xuXG5sZXQgYWxsTG9ncyA9ICcnXG5cbmV4cG9ydCBjb25zdCBydW5QbHVnaW4gPSAoKSA9PiB7XG4gIGNvbnN0IHBsdWdpbjogUGxheWdyb3VuZFBsdWdpbiA9IHtcbiAgICBpZDogJ2xvZ3MnLFxuICAgIGRpc3BsYXlOYW1lOiAnTG9ncycsXG4gICAgd2lsbE1vdW50OiAoc2FuZGJveCwgY29udGFpbmVyKSA9PiB7XG4gICAgICBpZiAoYWxsTG9ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3Qgbm9FcnJvcnNNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbm9FcnJvcnNNZXNzYWdlLmlkID0gJ2VtcHR5LW1lc3NhZ2UtY29udGFpbmVyJ1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9FcnJvcnNNZXNzYWdlKVxuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gJ05vIGxvZ3MnXG4gICAgICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZW1wdHktcGx1Z2luLW1lc3NhZ2UnKVxuICAgICAgICBub0Vycm9yc01lc3NhZ2UuYXBwZW5kQ2hpbGQobWVzc2FnZSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXJyb3JVTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBlcnJvclVMLmlkID0gJ2xvZy1jb250YWluZXInXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JVTClcblxuICAgICAgY29uc3QgbG9ncyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBsb2dzLmlkID0gJ2xvZydcbiAgICAgIGxvZ3MuaW5uZXJIVE1MID0gYWxsTG9nc1xuICAgICAgZXJyb3JVTC5hcHBlbmRDaGlsZChsb2dzKVxuICAgIH0sXG4gIH1cblxuICByZXR1cm4gcGx1Z2luXG59XG5cbmV4cG9ydCBjb25zdCBydW5XaXRoQ3VzdG9tTG9ncyA9IChjbG9zdXJlOiBQcm9taXNlPHN0cmluZz4pID0+IHtcbiAgY29uc3Qgbm9Mb2dzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtcHR5LW1lc3NhZ2UtY29udGFpbmVyJylcbiAgaWYgKG5vTG9ncykge1xuICAgIG5vTG9ncy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cblxuICByZXdpcmVMb2dnaW5nVG9FbGVtZW50KFxuICAgICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2cnKSEsXG4gICAgKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZy1jb250YWluZXInKSEsXG4gICAgY2xvc3VyZSxcbiAgICB0cnVlXG4gIClcbn1cblxuLy8gVGhhbmtzIFNPOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDI1Njc2MC9qYXZhc2NyaXB0LWNvbnNvbGUtbG9nLXRvLWh0bWwvMzU0NDkyNTYjMzU0NDkyNTZcblxuZnVuY3Rpb24gcmV3aXJlTG9nZ2luZ1RvRWxlbWVudChcbiAgZWxlTG9jYXRvcjogKCkgPT4gRWxlbWVudCxcbiAgZWxlT3ZlcmZsb3dMb2NhdG9yOiAoKSA9PiBFbGVtZW50LFxuICBjbG9zdXJlOiBQcm9taXNlPHN0cmluZz4sXG4gIGF1dG9TY3JvbGw6IGJvb2xlYW5cbikge1xuICBmaXhMb2dnaW5nRnVuYygnbG9nJywgJ0xPRycpXG4gIGZpeExvZ2dpbmdGdW5jKCdkZWJ1ZycsICdEQkcnKVxuICBmaXhMb2dnaW5nRnVuYygnd2FybicsICdXUk4nKVxuICBmaXhMb2dnaW5nRnVuYygnZXJyb3InLCAnRVJSJylcbiAgZml4TG9nZ2luZ0Z1bmMoJ2luZm8nLCAnSU5GJylcblxuICBjbG9zdXJlLnRoZW4oanMgPT4ge1xuICAgIGV2YWwoanMpXG5cbiAgICBhbGxMb2dzID0gYWxsTG9ncyArICc8aHIgLz4nXG5cbiAgICB1bmRvTG9nZ2luZ0Z1bmMoJ2xvZycpXG4gICAgdW5kb0xvZ2dpbmdGdW5jKCdkZWJ1ZycpXG4gICAgdW5kb0xvZ2dpbmdGdW5jKCd3YXJuJylcbiAgICB1bmRvTG9nZ2luZ0Z1bmMoJ2Vycm9yJylcbiAgICB1bmRvTG9nZ2luZ0Z1bmMoJ2luZm8nKVxuICB9KVxuXG4gIGZ1bmN0aW9uIHVuZG9Mb2dnaW5nRnVuYyhuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc29sZVtuYW1lXSA9IGNvbnNvbGVbJ29sZCcgKyBuYW1lXVxuICB9XG5cbiAgZnVuY3Rpb24gZml4TG9nZ2luZ0Z1bmMobmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnNvbGVbJ29sZCcgKyBuYW1lXSA9IGNvbnNvbGVbbmFtZV1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc29sZVtuYW1lXSA9IGZ1bmN0aW9uKC4uLm9ianM6IGFueVtdKSB7XG4gICAgICBjb25zdCBvdXRwdXQgPSBwcm9kdWNlT3V0cHV0KG9ianMpXG4gICAgICBjb25zdCBlbGVMb2cgPSBlbGVMb2NhdG9yKClcbiAgICAgIGNvbnN0IHByZWZpeCA9ICdbPHNwYW4gY2xhc3M9XCJsb2ctJyArIG5hbWUgKyAnXCI+JyArIGlkICsgJzwvc3Bhbj5dOiAnXG4gICAgICBjb25zdCBlbGVDb250YWluZXJMb2cgPSBlbGVPdmVyZmxvd0xvY2F0b3IoKVxuICAgICAgYWxsTG9ncyA9IGFsbExvZ3MgKyBwcmVmaXggKyBvdXRwdXQgKyAnPGJyPidcblxuICAgICAgaWYgKGVsZUxvZyAmJiBlbGVDb250YWluZXJMb2cpIHtcbiAgICAgICAgaWYgKGF1dG9TY3JvbGwpIHtcbiAgICAgICAgICBjb25zdCBhdEJvdHRvbSA9IGVsZUNvbnRhaW5lckxvZy5zY3JvbGxIZWlnaHQgLSBlbGVDb250YWluZXJMb2cuY2xpZW50SGVpZ2h0IDw9IGVsZUNvbnRhaW5lckxvZy5zY3JvbGxUb3AgKyAxXG4gICAgICAgICAgZWxlTG9nLmlubmVySFRNTCA9IGFsbExvZ3NcblxuICAgICAgICAgIGlmIChhdEJvdHRvbSkgZWxlQ29udGFpbmVyTG9nLnNjcm9sbFRvcCA9IGVsZUNvbnRhaW5lckxvZy5zY3JvbGxIZWlnaHQgLSBlbGVDb250YWluZXJMb2cuY2xpZW50SGVpZ2h0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlTG9nLmlubmVySFRNTCA9IGFsbExvZ3NcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zb2xlWydvbGQnICsgbmFtZV0uYXBwbHkodW5kZWZpbmVkLCBvYmpzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2R1Y2VPdXRwdXQoYXJnczogYW55W10pIHtcbiAgICByZXR1cm4gYXJncy5yZWR1Y2UoKG91dHB1dDogYW55LCBhcmc6IGFueSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlzT2JqID0gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAgIGxldCB0ZXh0UmVwID0gJydcbiAgICAgIGlmIChhcmcgJiYgYXJnLnN0YWNrICYmIGFyZy5tZXNzYWdlKSB7XG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgZXJyXG4gICAgICAgIHRleHRSZXAgPSBhcmcubWVzc2FnZVxuICAgICAgfSBlbHNlIGlmIChpc09iaikge1xuICAgICAgICB0ZXh0UmVwID0gSlNPTi5zdHJpbmdpZnkoYXJnLCBudWxsLCAyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dFJlcCA9IGFyZyBhcyBhbnlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvd0NvbW1hID0gaW5kZXggIT09IGFyZ3MubGVuZ3RoIC0gMVxuICAgICAgY29uc3QgY29tbWEgPSBzaG93Q29tbWEgPyBcIjxzcGFuIGNsYXNzPSdjb21tYSc+LCA8L3NwYW4+XCIgOiAnJ1xuICAgICAgcmV0dXJuIG91dHB1dCArIHRleHRSZXAgKyBjb21tYSArICcmbmJzcDsnXG4gICAgfSwgJycpXG4gIH1cbn1cbiJdfQ==