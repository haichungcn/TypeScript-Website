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
    exports.getExampleSourceCode = (prefix, lang, exampleID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const site = `${document.location.protocol}//${document.location.host}${prefix}`;
            const examplesTOCHref = `${site}/js/examples/${lang}.json`;
            const res = yield fetch(examplesTOCHref);
            if (!res.ok) {
                console.error('Could not fetch example TOC for lang: ' + lang);
                return {};
            }
            const toc = yield res.json();
            const example = toc.examples.find((e) => e.id === exampleID);
            if (!example) {
                // prettier-ignore
                console.error(`Could not find example with id: ${exampleID} in\n// ${document.location.protocol}//${document.location.host}${examplesTOCHref}`);
                return {};
            }
            const exampleCodePath = `${site}/js/examples/${example.lang}/${example.path.join('/')}/${example.name}`;
            const codeRes = yield fetch(exampleCodePath);
            let code = yield codeRes.text();
            // Handle removing the compiler settings stuff
            if (code.startsWith('//// {')) {
                code = code
                    .split('\n')
                    .slice(1)
                    .join('\n')
                    .trim();
            }
            return {
                example,
                code,
            };
        }
        catch (e) {
            console.log(e);
            return {};
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BsYXlncm91bmQvc3JjL2dldEV4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQWEsUUFBQSxvQkFBb0IsR0FBRyxDQUFPLE1BQWMsRUFBRSxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1FBQzVGLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFBO1lBQ2hGLE1BQU0sZUFBZSxHQUFHLEdBQUcsSUFBSSxnQkFBZ0IsSUFBSSxPQUFPLENBQUE7WUFDMUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsR0FBRyxJQUFJLENBQUMsQ0FBQTtnQkFDOUQsT0FBTyxFQUFFLENBQUE7YUFDVjtZQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQzVCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFBO1lBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osa0JBQWtCO2dCQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxTQUFTLFdBQVcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxFQUFFLENBQUMsQ0FBQTtnQkFDL0ksT0FBTyxFQUFFLENBQUE7YUFDVjtZQUVELE1BQU0sZUFBZSxHQUFHLEdBQUcsSUFBSSxnQkFBZ0IsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDdkcsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDNUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7WUFFL0IsOENBQThDO1lBQzlDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxHQUFHLElBQUk7cUJBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQztxQkFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQ1YsSUFBSSxFQUFFLENBQUE7YUFDVjtZQUVELE9BQU87Z0JBQ0wsT0FBTztnQkFDUCxJQUFJO2FBQ0wsQ0FBQTtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2QsT0FBTyxFQUFFLENBQUE7U0FDVjtJQUNILENBQUMsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldEV4YW1wbGVTb3VyY2VDb2RlID0gYXN5bmMgKHByZWZpeDogc3RyaW5nLCBsYW5nOiBzdHJpbmcsIGV4YW1wbGVJRDogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2l0ZSA9IGAke2RvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sfS8vJHtkb2N1bWVudC5sb2NhdGlvbi5ob3N0fSR7cHJlZml4fWBcbiAgICBjb25zdCBleGFtcGxlc1RPQ0hyZWYgPSBgJHtzaXRlfS9qcy9leGFtcGxlcy8ke2xhbmd9Lmpzb25gXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goZXhhbXBsZXNUT0NIcmVmKVxuICAgIGlmICghcmVzLm9rKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZmV0Y2ggZXhhbXBsZSBUT0MgZm9yIGxhbmc6ICcgKyBsYW5nKVxuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgY29uc3QgdG9jID0gYXdhaXQgcmVzLmpzb24oKVxuICAgIGNvbnN0IGV4YW1wbGUgPSB0b2MuZXhhbXBsZXMuZmluZCgoZTogYW55KSA9PiBlLmlkID09PSBleGFtcGxlSUQpXG4gICAgaWYgKCFleGFtcGxlKSB7XG4gICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBmaW5kIGV4YW1wbGUgd2l0aCBpZDogJHtleGFtcGxlSUR9IGluXFxuLy8gJHtkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbH0vLyR7ZG9jdW1lbnQubG9jYXRpb24uaG9zdH0ke2V4YW1wbGVzVE9DSHJlZn1gKVxuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgY29uc3QgZXhhbXBsZUNvZGVQYXRoID0gYCR7c2l0ZX0vanMvZXhhbXBsZXMvJHtleGFtcGxlLmxhbmd9LyR7ZXhhbXBsZS5wYXRoLmpvaW4oJy8nKX0vJHtleGFtcGxlLm5hbWV9YFxuICAgIGNvbnN0IGNvZGVSZXMgPSBhd2FpdCBmZXRjaChleGFtcGxlQ29kZVBhdGgpXG4gICAgbGV0IGNvZGUgPSBhd2FpdCBjb2RlUmVzLnRleHQoKVxuXG4gICAgLy8gSGFuZGxlIHJlbW92aW5nIHRoZSBjb21waWxlciBzZXR0aW5ncyBzdHVmZlxuICAgIGlmIChjb2RlLnN0YXJ0c1dpdGgoJy8vLy8geycpKSB7XG4gICAgICBjb2RlID0gY29kZVxuICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgIC5zbGljZSgxKVxuICAgICAgICAuam9pbignXFxuJylcbiAgICAgICAgLnRyaW0oKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlLFxuICAgICAgY29kZSxcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIHJldHVybiB7fVxuICB9XG59XG4iXX0=