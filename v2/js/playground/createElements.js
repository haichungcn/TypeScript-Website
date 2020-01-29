define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDragBar = () => {
        const sidebar = document.createElement('div');
        sidebar.className = 'playground-dragbar';
        let left, right;
        const drag = (e) => {
            if (left && right) {
                // Get how far right the mouse is from the right
                const rightX = right.getBoundingClientRect().right;
                const offset = rightX - e.pageX;
                const screenClampLeft = window.innerWidth - 320;
                const clampedOffset = Math.min(Math.max(offset, 280), screenClampLeft);
                // Set the widths
                left.style.width = `calc(100% - ${clampedOffset}px)`;
                right.style.width = `${clampedOffset}px`;
                right.style.flexBasis = `${clampedOffset}px`;
                right.style.maxWidth = `${clampedOffset}px`;
                // Save the x coordinate of the
                if (window.localStorage) {
                    window.localStorage.setItem('dragbar-x', '' + clampedOffset);
                    window.localStorage.setItem('dragbar-window-width', '' + window.innerWidth);
                }
                // Don't allow selection
                e.stopPropagation();
                e.cancelBubble = true;
            }
        };
        sidebar.addEventListener('mousedown', e => {
            var _a;
            left = document.getElementById('editor-container');
            right = (_a = sidebar.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('playground-sidebar').item(0);
            // Handle dragging all over the screen
            document.addEventListener('mousemove', drag);
            // Remove it when you lt go anywhere
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', drag);
                document.body.style.userSelect = 'auto';
            });
            // Don't allow the drag to select text accidentally
            document.body.style.userSelect = 'none';
            e.stopPropagation();
            e.cancelBubble = true;
        });
        return sidebar;
    };
    exports.createSidebar = () => {
        const sidebar = document.createElement('div');
        sidebar.className = 'playground-sidebar';
        // This is the last of the draggable divs
        if (window.localStorage && window.localStorage.getItem('dragbar-x')) {
            // Don't restore the x pos if the window isn't the same size
            if (window.innerWidth === Number(window.localStorage.getItem('dragbar-window-width'))) {
                // Set the dragger to the previous x pos
                const width = window.localStorage.getItem('dragbar-x');
                sidebar.style.width = `${width}px`;
                sidebar.style.flexBasis = `${width}px`;
                sidebar.style.maxWidth = `${width}px`;
                const left = document.getElementById('editor-container');
                left.style.width = `calc(100% - ${width}px)`;
            }
        }
        return sidebar;
    };
    exports.createTabBar = () => {
        const tabBar = document.createElement('div');
        tabBar.classList.add('playground-plugin-tabview');
        return tabBar;
    };
    exports.createPluginContainer = () => {
        const container = document.createElement('div');
        container.classList.add('playground-plugin-container');
        return container;
    };
    exports.createTabForPlugin = (plugin) => {
        const element = document.createElement('button');
        element.textContent = plugin.displayName;
        return element;
    };
    exports.activatePlugin = (plugin, previousPlugin, sandbox, tabBar, container) => {
        let newPluginTab, oldPluginTab;
        // @ts-ignore - This works at runtime
        for (const tab of tabBar.children) {
            if (tab.textContent === plugin.displayName)
                newPluginTab = tab;
            if (previousPlugin && tab.textContent === previousPlugin.displayName)
                oldPluginTab = tab;
        }
        // @ts-ignore
        if (!newPluginTab)
            throw new Error('Could not get a tab for the plugin: ' + plugin.displayName);
        // Tell the old plugin it's getting the boot
        // @ts-ignore
        if (previousPlugin && oldPluginTab) {
            if (previousPlugin.willUnmount)
                previousPlugin.willUnmount(sandbox, container);
            oldPluginTab.classList.remove('active');
        }
        // Wipe the sidebar
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        // Start booting up the new plugin
        newPluginTab.classList.add('active');
        // Tell the new plugin to start doing some work
        if (plugin.willMount)
            plugin.willMount(sandbox, container);
        if (plugin.modelChanged)
            plugin.modelChanged(sandbox, sandbox.getModel());
        if (plugin.modelChangedDebounce)
            plugin.modelChangedDebounce(sandbox, sandbox.getModel());
        if (plugin.didMount)
            plugin.didMount(sandbox, container);
        // Let the previous plugin do any slow work after it's all done
        if (previousPlugin && previousPlugin.didUnmount)
            previousPlugin.didUnmount(sandbox, container);
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wbGF5Z3JvdW5kL3NyYy9jcmVhdGVFbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJYSxRQUFBLGFBQWEsR0FBRyxHQUFHLEVBQUU7UUFDaEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QyxPQUFPLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFBO1FBRXhDLElBQUksSUFBaUIsRUFBRSxLQUFrQixDQUFBO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBYSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUNqQixnREFBZ0Q7Z0JBQ2hELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQTtnQkFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUE7Z0JBQy9CLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFBO2dCQUMvQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFBO2dCQUV0RSxpQkFBaUI7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGVBQWUsYUFBYSxLQUFLLENBQUE7Z0JBQ3BELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsYUFBYSxJQUFJLENBQUE7Z0JBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsYUFBYSxJQUFJLENBQUE7Z0JBQzVDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsYUFBYSxJQUFJLENBQUE7Z0JBRTNDLCtC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QVksRUFBRTtZQUNsQyxJQUFJLGNBQWMsQ0FBQyxXQUFXO2dCQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzlFLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ3hDO1FBRUQsbUJBQW1CO1FBQ25CLE9BQU8sU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUM1QztRQUVELGtDQUFrQztRQUNsQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVwQywrQ0FBK0M7UUFDL0MsSUFBSSxNQUFNLENBQUMsU0FBUztZQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQzFELElBQUksTUFBTSxDQUFDLFlBQVk7WUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUN6RSxJQUFJLE1BQU0sQ0FBQyxvQkFBb0I7WUFBRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3pGLElBQUksTUFBTSxDQUFDLFFBQVE7WUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUV4RCwrREFBK0Q7UUFDL0QsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLFVBQVU7WUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNoRyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5Z3JvdW5kUGx1Z2luIH0gZnJvbSAnLidcblxudHlwZSBTYW5kYm94ID0gUmV0dXJuVHlwZTx0eXBlb2YgaW1wb3J0KCd0eXBlc2NyaXB0LXNhbmRib3gnKS5jcmVhdGVUeXBlU2NyaXB0U2FuZGJveD5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURyYWdCYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBzaWRlYmFyLmNsYXNzTmFtZSA9ICdwbGF5Z3JvdW5kLWRyYWdiYXInXG5cbiAgbGV0IGxlZnQ6IEhUTUxFbGVtZW50LCByaWdodDogSFRNTEVsZW1lbnRcbiAgY29uc3QgZHJhZyA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKGxlZnQgJiYgcmlnaHQpIHtcbiAgICAgIC8vIEdldCBob3cgZmFyIHJpZ2h0IHRoZSBtb3VzZSBpcyBmcm9tIHRoZSByaWdodFxuICAgICAgY29uc3QgcmlnaHRYID0gcmlnaHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHRcbiAgICAgIGNvbnN0IG9mZnNldCA9IHJpZ2h0WCAtIGUucGFnZVhcbiAgICAgIGNvbnN0IHNjcmVlbkNsYW1wTGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gMzIwXG4gICAgICBjb25zdCBjbGFtcGVkT2Zmc2V0ID0gTWF0aC5taW4oTWF0aC5tYXgob2Zmc2V0LCAyODApLCBzY3JlZW5DbGFtcExlZnQpXG5cbiAgICAgIC8vIFNldCB0aGUgd2lkdGhzXG4gICAgICBsZWZ0LnN0eWxlLndpZHRoID0gYGNhbGMoMTAwJSAtICR7Y2xhbXBlZE9mZnNldH1weClgXG4gICAgICByaWdodC5zdHlsZS53aWR0aCA9IGAke2NsYW1wZWRPZmZzZXR9cHhgXG4gICAgICByaWdodC5zdHlsZS5mbGV4QmFzaXMgPSBgJHtjbGFtcGVkT2Zmc2V0fXB4YFxuICAgICAgcmlnaHQuc3R5bGUubWF4V2lkdGggPSBgJHtjbGFtcGVkT2Zmc2V0fXB4YFxuXG4gICAgICAvLyBTYXZlIHRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RyYWdiYXIteCcsICcnICsgY2xhbXBlZE9mZnNldClcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmFnYmFyLXdpbmRvdy13aWR0aCcsICcnICsgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IGFsbG93IHNlbGVjdGlvblxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgZS5jYW5jZWxCdWJibGUgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcbiAgICBsZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRvci1jb250YWluZXInKSFcbiAgICByaWdodCA9IHNpZGViYXIucGFyZW50RWxlbWVudD8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGxheWdyb3VuZC1zaWRlYmFyJykuaXRlbSgwKSEgYXMgYW55XG4gICAgLy8gSGFuZGxlIGRyYWdnaW5nIGFsbCBvdmVyIHRoZSBzY3JlZW5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnKVxuICAgIC8vIFJlbW92ZSBpdCB3aGVuIHlvdSBsdCBnbyBhbnl3aGVyZVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmFnKVxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS51c2VyU2VsZWN0ID0gJ2F1dG8nXG4gICAgfSlcblxuICAgIC8vIERvbid0IGFsbG93IHRoZSBkcmFnIHRvIHNlbGVjdCB0ZXh0IGFjY2lkZW50YWxseVxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWVcbiAgfSlcblxuICByZXR1cm4gc2lkZWJhclxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlU2lkZWJhciA9ICgpID0+IHtcbiAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIHNpZGViYXIuY2xhc3NOYW1lID0gJ3BsYXlncm91bmQtc2lkZWJhcidcblxuICAvLyBUaGlzIGlzIHRoZSBsYXN0IG9mIHRoZSBkcmFnZ2FibGUgZGl2c1xuICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSAmJiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYWdiYXIteCcpKSB7XG4gICAgLy8gRG9uJ3QgcmVzdG9yZSB0aGUgeCBwb3MgaWYgdGhlIHdpbmRvdyBpc24ndCB0aGUgc2FtZSBzaXplXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID09PSBOdW1iZXIod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmFnYmFyLXdpbmRvdy13aWR0aCcpKSkge1xuICAgICAgLy8gU2V0IHRoZSBkcmFnZ2VyIHRvIHRoZSBwcmV2aW91cyB4IHBvc1xuICAgICAgY29uc3Qgd2lkdGggPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYWdiYXIteCcpXG4gICAgICBzaWRlYmFyLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgXG4gICAgICBzaWRlYmFyLnN0eWxlLmZsZXhCYXNpcyA9IGAke3dpZHRofXB4YFxuICAgICAgc2lkZWJhci5zdHlsZS5tYXhXaWR0aCA9IGAke3dpZHRofXB4YFxuXG4gICAgICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRvci1jb250YWluZXInKSFcbiAgICAgIGxlZnQuc3R5bGUud2lkdGggPSBgY2FsYygxMDAlIC0gJHt3aWR0aH1weClgXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpZGViYXJcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRhYkJhciA9ICgpID0+IHtcbiAgY29uc3QgdGFiQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgdGFiQmFyLmNsYXNzTGlzdC5hZGQoJ3BsYXlncm91bmQtcGx1Z2luLXRhYnZpZXcnKVxuICByZXR1cm4gdGFiQmFyXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbHVnaW5Db250YWluZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwbGF5Z3JvdW5kLXBsdWdpbi1jb250YWluZXInKVxuICByZXR1cm4gY29udGFpbmVyXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUYWJGb3JQbHVnaW4gPSAocGx1Z2luOiBQbGF5Z3JvdW5kUGx1Z2luKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICBlbGVtZW50LnRleHRDb250ZW50ID0gcGx1Z2luLmRpc3BsYXlOYW1lXG4gIHJldHVybiBlbGVtZW50XG59XG5cbmV4cG9ydCBjb25zdCBhY3RpdmF0ZVBsdWdpbiA9IChcbiAgcGx1Z2luOiBQbGF5Z3JvdW5kUGx1Z2luLFxuICBwcmV2aW91c1BsdWdpbjogUGxheWdyb3VuZFBsdWdpbiB8IHVuZGVmaW5lZCxcbiAgc2FuZGJveDogU2FuZGJveCxcbiAgdGFiQmFyOiBIVE1MRGl2RWxlbWVudCxcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudFxuKSA9PiB7XG4gIGxldCBuZXdQbHVnaW5UYWI6IEVsZW1lbnQsIG9sZFBsdWdpblRhYjogRWxlbWVudFxuICAvLyBAdHMtaWdub3JlIC0gVGhpcyB3b3JrcyBhdCBydW50aW1lXG4gIGZvciAoY29uc3QgdGFiIG9mIHRhYkJhci5jaGlsZHJlbikge1xuICAgIGlmICh0YWIudGV4dENvbnRlbnQgPT09IHBsdWdpbi5kaXNwbGF5TmFtZSkgbmV3UGx1Z2luVGFiID0gdGFiXG4gICAgaWYgKHByZXZpb3VzUGx1Z2luICYmIHRhYi50ZXh0Q29udGVudCA9PT0gcHJldmlvdXNQbHVnaW4uZGlzcGxheU5hbWUpIG9sZFBsdWdpblRhYiA9IHRhYlxuICB9XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAoIW5ld1BsdWdpblRhYikgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZ2V0IGEgdGFiIGZvciB0aGUgcGx1Z2luOiAnICsgcGx1Z2luLmRpc3BsYXlOYW1lKVxuXG4gIC8vIFRlbGwgdGhlIG9sZCBwbHVnaW4gaXQncyBnZXR0aW5nIHRoZSBib290XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKHByZXZpb3VzUGx1Z2luICYmIG9sZFBsdWdpblRhYikge1xuICAgIGlmIChwcmV2aW91c1BsdWdpbi53aWxsVW5tb3VudCkgcHJldmlvdXNQbHVnaW4ud2lsbFVubW91bnQoc2FuZGJveCwgY29udGFpbmVyKVxuICAgIG9sZFBsdWdpblRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICB9XG5cbiAgLy8gV2lwZSB0aGUgc2lkZWJhclxuICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmZpcnN0Q2hpbGQpXG4gIH1cblxuICAvLyBTdGFydCBib290aW5nIHVwIHRoZSBuZXcgcGx1Z2luXG4gIG5ld1BsdWdpblRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuXG4gIC8vIFRlbGwgdGhlIG5ldyBwbHVnaW4gdG8gc3RhcnQgZG9pbmcgc29tZSB3b3JrXG4gIGlmIChwbHVnaW4ud2lsbE1vdW50KSBwbHVnaW4ud2lsbE1vdW50KHNhbmRib3gsIGNvbnRhaW5lcilcbiAgaWYgKHBsdWdpbi5tb2RlbENoYW5nZWQpIHBsdWdpbi5tb2RlbENoYW5nZWQoc2FuZGJveCwgc2FuZGJveC5nZXRNb2RlbCgpKVxuICBpZiAocGx1Z2luLm1vZGVsQ2hhbmdlZERlYm91bmNlKSBwbHVnaW4ubW9kZWxDaGFuZ2VkRGVib3VuY2Uoc2FuZGJveCwgc2FuZGJveC5nZXRNb2RlbCgpKVxuICBpZiAocGx1Z2luLmRpZE1vdW50KSBwbHVnaW4uZGlkTW91bnQoc2FuZGJveCwgY29udGFpbmVyKVxuXG4gIC8vIExldCB0aGUgcHJldmlvdXMgcGx1Z2luIGRvIGFueSBzbG93IHdvcmsgYWZ0ZXIgaXQncyBhbGwgZG9uZVxuICBpZiAocHJldmlvdXNQbHVnaW4gJiYgcHJldmlvdXNQbHVnaW4uZGlkVW5tb3VudCkgcHJldmlvdXNQbHVnaW4uZGlkVW5tb3VudChzYW5kYm94LCBjb250YWluZXIpXG59XG4iXX0=