define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showDTSPlugin = () => {
        let codeElement;
        const plugin = {
            id: 'dts',
            displayName: 'DTS',
            willMount: (sandbox, container) => {
                // TODO: Monaco?
                const createCodePre = document.createElement('pre');
                codeElement = document.createElement('code');
                createCodePre.appendChild(codeElement);
                container.appendChild(createCodePre);
            },
            modelChanged: (sandbox, model) => {
                sandbox.getDTSForCode().then(dts => {
                    sandbox.monaco.editor.colorize(dts, 'typescript', {}).then(coloredDTS => {
                        codeElement.innerHTML = coloredDTS;
                    });
                });
            },
        };
        return plugin;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd0RUUy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BsYXlncm91bmQvc3JjL3NpZGViYXIvc2hvd0RUUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFYSxRQUFBLGFBQWEsR0FBRyxHQUFHLEVBQUU7UUFDaEMsSUFBSSxXQUF3QixDQUFBO1FBRTVCLE1BQU0sTUFBTSxHQUFxQjtZQUMvQixFQUFFLEVBQUUsS0FBSztZQUNULFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRTtnQkFDaEMsZ0JBQWdCO2dCQUNoQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNuRCxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFFNUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFDdEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN0QyxDQUFDO1lBQ0QsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMvQixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ3RFLFdBQVcsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFBO29CQUNwQyxDQUFDLENBQUMsQ0FBQTtnQkFDSixDQUFDLENBQUMsQ0FBQTtZQUNKLENBQUM7U0FDRixDQUFBO1FBRUQsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5Z3JvdW5kUGx1Z2luIH0gZnJvbSAnLi4nXG5cbmV4cG9ydCBjb25zdCBzaG93RFRTUGx1Z2luID0gKCkgPT4ge1xuICBsZXQgY29kZUVsZW1lbnQ6IEhUTUxFbGVtZW50XG5cbiAgY29uc3QgcGx1Z2luOiBQbGF5Z3JvdW5kUGx1Z2luID0ge1xuICAgIGlkOiAnZHRzJyxcbiAgICBkaXNwbGF5TmFtZTogJ0RUUycsXG4gICAgd2lsbE1vdW50OiAoc2FuZGJveCwgY29udGFpbmVyKSA9PiB7XG4gICAgICAvLyBUT0RPOiBNb25hY28/XG4gICAgICBjb25zdCBjcmVhdGVDb2RlUHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJylcbiAgICAgIGNvZGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpXG5cbiAgICAgIGNyZWF0ZUNvZGVQcmUuYXBwZW5kQ2hpbGQoY29kZUVsZW1lbnQpXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29kZVByZSlcbiAgICB9LFxuICAgIG1vZGVsQ2hhbmdlZDogKHNhbmRib3gsIG1vZGVsKSA9PiB7XG4gICAgICBzYW5kYm94LmdldERUU0ZvckNvZGUoKS50aGVuKGR0cyA9PiB7XG4gICAgICAgIHNhbmRib3gubW9uYWNvLmVkaXRvci5jb2xvcml6ZShkdHMsICd0eXBlc2NyaXB0Jywge30pLnRoZW4oY29sb3JlZERUUyA9PiB7XG4gICAgICAgICAgY29kZUVsZW1lbnQuaW5uZXJIVE1MID0gY29sb3JlZERUU1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICB9XG5cbiAgcmV0dXJuIHBsdWdpblxufVxuIl19