define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.optionsPlugin = () => {
        const plugin = {
            id: 'options',
            displayName: 'Options',
            willMount: (sandbox, container) => {
                const categoryDiv = document.createElement('div');
                const ol = document.createElement('ol');
                ol.id = 'playground-options';
                const settings = [
                    {
                        display: 'Disable ATA',
                        blurb: 'Disable the automatic acquisition of types for imports and requires',
                        flag: 'disable-ata',
                    },
                    {
                        display: 'Disable Save-On-Type',
                        blurb: 'Disable changing the URL when you type',
                        flag: 'disable-save-on-type',
                    },
                ];
                settings.forEach(setting => {
                    const li = document.createElement('li');
                    const label = document.createElement('label');
                    label.innerHTML = `<span>${setting.display}</span><br/>${setting.blurb}`;
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = 'compiler-setting-' + setting.flag;
                    input.checked = !!localStorage.getItem(setting.flag);
                    input.onchange = () => {
                        if (input.checked) {
                            localStorage.setItem(setting.flag, 'true');
                        }
                        else {
                            localStorage.removeItem(setting.flag);
                        }
                    };
                    label.htmlFor = input.id;
                    li.appendChild(input);
                    li.appendChild(label);
                    ol.appendChild(li);
                });
                categoryDiv.appendChild(ol);
                container.appendChild(categoryDiv);
            },
        };
        return plugin;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BsYXlncm91bmQvc3JjL3NpZGViYXIvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFYSxRQUFBLGFBQWEsR0FBRyxHQUFHLEVBQUU7UUFDaEMsTUFBTSxNQUFNLEdBQXFCO1lBQy9CLEVBQUUsRUFBRSxTQUFTO1lBQ2IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUNoQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqRCxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUN2QyxFQUFFLENBQUMsRUFBRSxHQUFHLG9CQUFvQixDQUFBO2dCQUU1QixNQUFNLFFBQVEsR0FBRztvQkFDZjt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsS0FBSyxFQUFFLHFFQUFxRTt3QkFDNUUsSUFBSSxFQUFFLGFBQWE7cUJBQ3BCO29CQUNEO3dCQUNFLE9BQU8sRUFBRSxzQkFBc0I7d0JBQy9CLEtBQUssRUFBRSx3Q0FBd0M7d0JBQy9DLElBQUksRUFBRSxzQkFBc0I7cUJBQzdCO2lCQU1GLENBQUE7Z0JBRUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDekIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDdkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDN0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLE9BQU8sQ0FBQyxPQUFPLGVBQWUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO29CQUV4RSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUM3QyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQTtvQkFDdkIsS0FBSyxDQUFDLEVBQUUsR0FBRyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO29CQUM3QyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFFcEQsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7d0JBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTs0QkFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO3lCQUMzQzs2QkFBTTs0QkFDTCxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTt5QkFDdEM7b0JBQ0gsQ0FBQyxDQUFBO29CQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQTtvQkFFeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDckIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQyxDQUFDLENBQUE7Z0JBRUYsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDM0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNwQyxDQUFDO1NBQ0YsQ0FBQTtRQUVELE9BQU8sTUFBTSxDQUFBO0lBQ2YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWdyb3VuZFBsdWdpbiB9IGZyb20gJy4uJ1xuXG5leHBvcnQgY29uc3Qgb3B0aW9uc1BsdWdpbiA9ICgpID0+IHtcbiAgY29uc3QgcGx1Z2luOiBQbGF5Z3JvdW5kUGx1Z2luID0ge1xuICAgIGlkOiAnb3B0aW9ucycsXG4gICAgZGlzcGxheU5hbWU6ICdPcHRpb25zJyxcbiAgICB3aWxsTW91bnQ6IChzYW5kYm94LCBjb250YWluZXIpID0+IHtcbiAgICAgIGNvbnN0IGNhdGVnb3J5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGNvbnN0IG9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKVxuICAgICAgb2wuaWQgPSAncGxheWdyb3VuZC1vcHRpb25zJ1xuXG4gICAgICBjb25zdCBzZXR0aW5ncyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGRpc3BsYXk6ICdEaXNhYmxlIEFUQScsXG4gICAgICAgICAgYmx1cmI6ICdEaXNhYmxlIHRoZSBhdXRvbWF0aWMgYWNxdWlzaXRpb24gb2YgdHlwZXMgZm9yIGltcG9ydHMgYW5kIHJlcXVpcmVzJyxcbiAgICAgICAgICBmbGFnOiAnZGlzYWJsZS1hdGEnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlzcGxheTogJ0Rpc2FibGUgU2F2ZS1Pbi1UeXBlJyxcbiAgICAgICAgICBibHVyYjogJ0Rpc2FibGUgY2hhbmdpbmcgdGhlIFVSTCB3aGVuIHlvdSB0eXBlJyxcbiAgICAgICAgICBmbGFnOiAnZGlzYWJsZS1zYXZlLW9uLXR5cGUnLFxuICAgICAgICB9LFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgZGlzcGxheTogJ1ZlcmJvc2UgTG9nZ2luZycsXG4gICAgICAgIC8vICAgYmx1cmI6ICdUdXJuIG9uIHN1cGVyZmx1b3VzIGxvZ2dpbmcnLFxuICAgICAgICAvLyAgIGZsYWc6ICdlbmFibGUtc3VwZXJmbHVvdXMtbG9nZ2luZycsXG4gICAgICAgIC8vIH0sXG4gICAgICBdXG5cbiAgICAgIHNldHRpbmdzLmZvckVhY2goc2V0dGluZyA9PiB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gYDxzcGFuPiR7c2V0dGluZy5kaXNwbGF5fTwvc3Bhbj48YnIvPiR7c2V0dGluZy5ibHVyYn1gXG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIGlucHV0LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIGlucHV0LmlkID0gJ2NvbXBpbGVyLXNldHRpbmctJyArIHNldHRpbmcuZmxhZ1xuICAgICAgICBpbnB1dC5jaGVja2VkID0gISFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzZXR0aW5nLmZsYWcpXG5cbiAgICAgICAgaW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNldHRpbmcuZmxhZywgJ3RydWUnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzZXR0aW5nLmZsYWcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGFiZWwuaHRtbEZvciA9IGlucHV0LmlkXG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW5wdXQpXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGxhYmVsKVxuICAgICAgICBvbC5hcHBlbmRDaGlsZChsaSlcbiAgICAgIH0pXG5cbiAgICAgIGNhdGVnb3J5RGl2LmFwcGVuZENoaWxkKG9sKVxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhdGVnb3J5RGl2KVxuICAgIH0sXG4gIH1cblxuICByZXR1cm4gcGx1Z2luXG59XG4iXX0=