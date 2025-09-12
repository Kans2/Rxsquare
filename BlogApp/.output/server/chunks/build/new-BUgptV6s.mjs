import { _ as __nuxt_component_0 } from './nuxt-link-CqW1ogP9.mjs';
import { ref, reactive, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const uploading = ref(false);
    const form = reactive({
      title: "",
      description: "",
      imageUrl: "",
      date: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-page-container" }, _attrs))}><div class="form-content-wrapper"><h1>Create New Blog Post</h1><form><div class="form-group"><label for="title">Title</label><input type="text" id="title"${ssrRenderAttr("value", form.title)} required></div><div class="form-group"><label for="description">Description</label><textarea id="description" required>${ssrInterpolate(form.description)}</textarea></div><div class="form-group"><label for="image">Upload Image</label><input type="file" id="image" accept="image/*" required></div>`);
      if (uploading.value) {
        _push(`<div style="${ssrRenderStyle({ "color": "blue" })}">Uploading image...</div>`);
      } else {
        _push(`<!---->`);
      }
      if (form.imageUrl) {
        _push(`<div style="${ssrRenderStyle({ "margin-top": "10px" })}"><p>Image uploaded. Preview:</p><img${ssrRenderAttr("src", form.imageUrl)} alt="Uploaded Image" style="${ssrRenderStyle({ "max-width": "200px", "max-height": "200px" })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="form-group"><label for="date">Date</label><input type="date" id="date"${ssrRenderAttr("value", form.date)} required></div><div class="form-buttons"><button type="submit"${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""}>Add Post</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/blog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cancel`);
          } else {
            return [
              createTextVNode("Cancel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-BUgptV6s.mjs.map
