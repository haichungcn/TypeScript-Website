define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compiledJSPlugin = () => {
        let codeElement;
        const plugin = {
            id: 'js',
            displayName: 'JS',
            willMount: (sandbox, container) => {
                const createCodePre = document.createElement('pre');
                codeElement = document.createElement('code');
                createCodePre.appendChild(codeElement);
                container.appendChild(createCodePre);
            },
            modelChangedDebounce: (sandbox, model) => {
                sandbox.getRunnableJS().then(js => {
                    sandbox.monaco.editor.colorize(js, 'javascript', {}).then(coloredJS => {
                        codeElement.innerHTML = coloredJS;
                    });
                });
            },
        };
        return plugin;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd0pTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGxheWdyb3VuZC9zcmMvc2lkZWJhci9zaG93SlMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRWEsUUFBQSxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7UUFDbkMsSUFBSSxXQUF3QixDQUFBO1FBRTVCLE1BQU0sTUFBTSxHQUFxQjtZQUMvQixFQUFFLEVBQUUsSUFBSTtZQUNSLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDaEMsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbkQsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRTVDLGFBQWEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ3RDLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDdEMsQ0FBQztZQUNELG9CQUFvQixFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNoQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3BFLFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO29CQUNuQyxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFBO1FBRUQsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5Z3JvdW5kUGx1Z2luIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBjb25zdCBjb21waWxlZEpTUGx1Z2luID0gKCkgPT4ge1xuICBsZXQgY29kZUVsZW1lbnQ6IEhUTUxFbGVtZW50XG5cbiAgY29uc3QgcGx1Z2luOiBQbGF5Z3JvdW5kUGx1Z2luID0ge1xuICAgIGlkOiAnanMnLFxuICAgIGRpc3BsYXlOYW1lOiAnSlMnLFxuICAgIHdpbGxNb3VudDogKHNhbmRib3gsIGNvbnRhaW5lcikgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlQ29kZVByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpXG4gICAgICBjb2RlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKVxuXG4gICAgICBjcmVhdGVDb2RlUHJlLmFwcGVuZENoaWxkKGNvZGVFbGVtZW50KVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUNvZGVQcmUpXG4gICAgfSxcbiAgICBtb2RlbENoYW5nZWREZWJvdW5jZTogKHNhbmRib3gsIG1vZGVsKSA9PiB7XG4gICAgICBzYW5kYm94LmdldFJ1bm5hYmxlSlMoKS50aGVuKGpzID0+IHtcbiAgICAgICAgc2FuZGJveC5tb25hY28uZWRpdG9yLmNvbG9yaXplKGpzLCAnamF2YXNjcmlwdCcsIHt9KS50aGVuKGNvbG9yZWRKUyA9PiB7XG4gICAgICAgICAgY29kZUVsZW1lbnQuaW5uZXJIVE1MID0gY29sb3JlZEpTXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gIH1cblxuICByZXR1cm4gcGx1Z2luXG59XG4iXX0=