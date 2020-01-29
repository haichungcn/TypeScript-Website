var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showErrors = () => {
        let decorations = [];
        let decorationLock = false;
        const plugin = {
            id: 'errors',
            displayName: 'Errors',
            willMount: (sandbox, container) => __awaiter(void 0, void 0, void 0, function* () {
                const noErrorsMessage = document.createElement('div');
                noErrorsMessage.id = 'empty-message-container';
                container.appendChild(noErrorsMessage);
                const errorUL = document.createElement('ul');
                errorUL.id = 'compiler-errors';
                container.appendChild(errorUL);
            }),
            modelChangedDebounce: (sandbox, model) => __awaiter(void 0, void 0, void 0, function* () {
                sandbox.getWorkerProcess().then(worker => {
                    worker.getSemanticDiagnostics(model.uri.toString()).then(diags => {
                        const errorUL = document.getElementById('compiler-errors');
                        const noErrorsMessage = document.getElementById('empty-message-container');
                        if (!errorUL || !noErrorsMessage)
                            return;
                        while (errorUL.firstChild) {
                            errorUL.removeChild(errorUL.firstChild);
                        }
                        // Bail early if there's nothing to show
                        if (!diags.length) {
                            errorUL.style.display = 'none';
                            noErrorsMessage.style.display = 'flex';
                            // Already has a message
                            if (noErrorsMessage.children.length)
                                return;
                            const message = document.createElement('div');
                            message.textContent = 'No errors';
                            message.classList.add('empty-plugin-message');
                            noErrorsMessage.appendChild(message);
                            return;
                        }
                        noErrorsMessage.style.display = 'none';
                        errorUL.style.display = 'block';
                        diags.forEach(diag => {
                            const li = document.createElement('li');
                            li.classList.add('diagnostic');
                            switch (diag.category) {
                                case 0:
                                    li.classList.add('warning');
                                    break;
                                case 1:
                                    li.classList.add('error');
                                    break;
                                case 2:
                                    li.classList.add('suggestion');
                                    break;
                                case 3:
                                    li.classList.add('message');
                                    break;
                            }
                            if (typeof diag === 'string') {
                                li.textContent = diag;
                            }
                            else {
                                li.textContent = sandbox.ts.flattenDiagnosticMessageText(diag.messageText, '\n');
                            }
                            errorUL.appendChild(li);
                            li.onmouseenter = () => {
                                if (diag.start && diag.length && !decorationLock) {
                                    const start = model.getPositionAt(diag.start);
                                    const end = model.getPositionAt(diag.start + diag.length);
                                    decorations = sandbox.editor.deltaDecorations(decorations, [
                                        {
                                            range: new sandbox.monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
                                            options: { inlineClassName: 'error-highlight' },
                                        },
                                    ]);
                                }
                            };
                            li.onmouseleave = () => {
                                if (!decorationLock) {
                                    sandbox.editor.deltaDecorations(decorations, []);
                                }
                            };
                            li.onclick = () => {
                                if (diag.start && diag.length) {
                                    const start = model.getPositionAt(diag.start);
                                    sandbox.editor.revealLine(start.lineNumber);
                                    const end = model.getPositionAt(diag.start + diag.length);
                                    decorations = sandbox.editor.deltaDecorations(decorations, [
                                        {
                                            range: new sandbox.monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
                                            options: { inlineClassName: 'error-highlight', isWholeLine: true },
                                        },
                                    ]);
                                    decorationLock = true;
                                    setTimeout(() => {
                                        decorationLock = false;
                                        sandbox.editor.deltaDecorations(decorations, []);
                                    }, 300);
                                }
                            };
                        });
                    });
                });
            }),
        };
        return plugin;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd0Vycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BsYXlncm91bmQvc3JjL3NpZGViYXIvc2hvd0Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFFYSxRQUFBLFVBQVUsR0FBRyxHQUFHLEVBQUU7UUFDN0IsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFBO1FBQzlCLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQTtRQUUxQixNQUFNLE1BQU0sR0FBcUI7WUFDL0IsRUFBRSxFQUFFLFFBQVE7WUFDWixXQUFXLEVBQUUsUUFBUTtZQUNyQixTQUFTLEVBQUUsQ0FBTyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3JELGVBQWUsQ0FBQyxFQUFFLEdBQUcseUJBQXlCLENBQUE7Z0JBQzlDLFNBQVMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBRXRDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzVDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUE7Z0JBQzlCLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFBO1lBRUQsb0JBQW9CLEVBQUUsQ0FBTyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDdkMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQy9ELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMs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RTt5Q0FDbkU7cUNBQ0YsQ0FBQyxDQUFBO29DQUVGLGNBQWMsR0FBRyxJQUFJLENBQUE7b0NBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0NBQ2QsY0FBYyxHQUFHLEtBQUssQ0FBQTt3Q0FDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUE7b0NBQ2xELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtpQ0FDUjs0QkFDSCxDQUFDLENBQUE7d0JBQ0gsQ0FBQyxDQUFDLENBQUE7b0JBQ0osQ0FBQyxDQUFDLENBQUE7Z0JBQ0osQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDLENBQUE7U0FDRixDQUFBO1FBRUQsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5Z3JvdW5kUGx1Z2luIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBjb25zdCBzaG93RXJyb3JzID0gKCkgPT4ge1xuICBsZXQgZGVjb3JhdGlvbnM6IHN0cmluZ1tdID0gW11cbiAgbGV0IGRlY29yYXRpb25Mb2NrID0gZmFsc2VcblxuICBjb25zdCBwbHVnaW46IFBsYXlncm91bmRQbHVnaW4gPSB7XG4gICAgaWQ6ICdlcnJvcnMnLFxuICAgIGRpc3BsYXlOYW1lOiAnRXJyb3JzJyxcbiAgICB3aWxsTW91bnQ6IGFzeW5jIChzYW5kYm94LCBjb250YWluZXIpID0+IHtcbiAgICAgIGNvbnN0IG5vRXJyb3JzTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBub0Vycm9yc01lc3NhZ2UuaWQgPSAnZW1wdHktbWVzc2FnZS1jb250YWluZXInXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9FcnJvcnNNZXNzYWdlKVxuXG4gICAgICBjb25zdCBlcnJvclVMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgZXJyb3JVTC5pZCA9ICdjb21waWxlci1lcnJvcnMnXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZXJyb3JVTClcbiAgICB9LFxuXG4gICAgbW9kZWxDaGFuZ2VkRGVib3VuY2U6IGFzeW5jIChzYW5kYm94LCBtb2RlbCkgPT4ge1xuICAgICAgc2FuZGJveC5nZXRXb3JrZXJQcm9jZXNzKCkudGhlbih3b3JrZXIgPT4ge1xuICAgICAgICB3b3JrZXIuZ2V0U2VtYW50aWNEaWFnbm9zdGljcyhtb2RlbC51cmkudG9TdHJpbmcoKSkudGhlbihkaWFncyA9PiB7XG4gICAgICAgICAgY29uc3QgZXJyb3JVTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21waWxlci1lcnJvcnMnKVxuICAgICAgICAgIGNvbnN0IG5vRXJyb3JzTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbXB0eS1tZXNzYWdlLWNvbnRhaW5lcicpXG4gICAgICAgICAgaWYgKCFlcnJvclVMIHx8ICFub0Vycm9yc01lc3NhZ2UpIHJldHVyblxuXG4gICAgICAgICAgd2hpbGUgKGVycm9yVUwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZXJyb3JVTC5yZW1vdmVDaGlsZChlcnJvclVMLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQmFpbCBlYXJseSBpZiB0aGVyZSdzIG5vdGhpbmcgdG8gc2hvd1xuICAgICAgICAgIGlmICghZGlhZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBlcnJvclVMLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIG5vRXJyb3JzTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG5cbiAgICAgICAgICAgIC8vIEFscmVhZHkgaGFzIGEgbWVzc2FnZVxuICAgICAgICAgICAgaWYgKG5vRXJyb3JzTWVzc2FnZS5jaGlsZHJlbi5sZW5ndGgpIHJldHVyblxuXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIG1lc3NhZ2UudGV4dENvbnRlbnQgPSAnTm8gZXJyb3JzJ1xuICAgICAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdlbXB0eS1wbHVnaW4tbWVzc2FnZScpXG4gICAgICAgICAgICBub0Vycm9yc01lc3NhZ2UuYXBwZW5kQ2hpbGQobWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5vRXJyb3JzTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgZXJyb3JVTC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuXG4gICAgICAgICAgZGlhZ3MuZm9yRWFjaChkaWFnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnZGlhZ25vc3RpYycpXG4gICAgICAgICAgICBzd2l0Y2ggKGRpYWcuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3dhcm5pbmcnKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdlcnJvcicpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3N1Z2dlc3Rpb24nKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlJylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRpYWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGxpLnRleHRDb250ZW50ID0gZGlhZ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBzYW5kYm94LnRzLmZsYXR0ZW5EaWFnbm9zdGljTWVzc2FnZVRleHQoZGlhZy5tZXNzYWdlVGV4dCwgJ1xcbicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlcnJvclVMLmFwcGVuZENoaWxkKGxpKVxuXG4gICAgICAgICAgICBsaS5vbm1vdXNlZW50ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChkaWFnLnN0YXJ0ICYmIGRpYWcubGVuZ3RoICYmICFkZWNvcmF0aW9uTG9jaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9kZWwuZ2V0UG9zaXRpb25BdChkaWFnLnN0YXJ0KVxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IG1vZGVsLmdldFBvc2l0aW9uQXQoZGlhZy5zdGFydCArIGRpYWcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGRlY29yYXRpb25zID0gc2FuZGJveC5lZGl0b3IuZGVsdGFEZWNvcmF0aW9ucyhkZWNvcmF0aW9ucywgW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogbmV3IHNhbmRib3gubW9uYWNvLlJhbmdlKHN0YXJ0LmxpbmVOdW1iZXIsIHN0YXJ0LmNvbHVtbiwgZW5kLmxpbmVOdW1iZXIsIGVuZC5jb2x1bW4pLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7IGlubGluZUNsYXNzTmFtZTogJ2Vycm9yLWhpZ2hsaWdodCcgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaS5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghZGVjb3JhdGlvbkxvY2spIHtcbiAgICAgICAgICAgICAgICBzYW5kYm94LmVkaXRvci5kZWx0YURlY29yYXRpb25zKGRlY29yYXRpb25zLCBbXSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZGlhZy5zdGFydCAmJiBkaWFnLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9kZWwuZ2V0UG9zaXRpb25BdChkaWFnLnN0YXJ0KVxuICAgICAgICAgICAgICAgIHNhbmRib3guZWRpdG9yLnJldmVhbExpbmUoc3RhcnQubGluZU51bWJlcilcblxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IG1vZGVsLmdldFBvc2l0aW9uQXQoZGlhZy5zdGFydCArIGRpYWcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGRlY29yYXRpb25zID0gc2FuZGJveC5lZGl0b3IuZGVsdGFEZWNvcmF0aW9ucyhkZWNvcmF0aW9ucywgW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogbmV3IHNhbmRib3gubW9uYWNvLlJhbmdlKHN0YXJ0LmxpbmVOdW1iZXIsIHN0YXJ0LmNvbHVtbiwgZW5kLmxpbmVOdW1iZXIsIGVuZC5jb2x1bW4pLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7IGlubGluZUNsYXNzTmFtZTogJ2Vycm9yLWhpZ2hsaWdodCcsIGlzV2hvbGVMaW5lOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0pXG5cbiAgICAgICAgICAgICAgICBkZWNvcmF0aW9uTG9jayA9IHRydWVcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGRlY29yYXRpb25Mb2NrID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgIHNhbmRib3guZWRpdG9yLmRlbHRhRGVjb3JhdGlvbnMoZGVjb3JhdGlvbnMsIFtdKVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gIH1cblxuICByZXR1cm4gcGx1Z2luXG59XG4iXX0=