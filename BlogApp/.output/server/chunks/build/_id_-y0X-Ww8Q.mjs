import { _ as __nuxt_component_0 } from './nuxt-link-CqW1ogP9.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useAsyncData } from './asyncData-B7QpExav.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const { data: post, pending, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `post-${id}`,
      () => $fetch(`/api/blog/${id}`)
    )), __temp = await __temp, __restore(), __temp);
    const formattedDate = computed(() => {
      if (!post.value || !post.value.date) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(post.value.date).toLocaleDateString("en-US", options);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-container" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div><p>Loading post...</p></div>`);
      } else if (unref(error)) {
        _push(`<div><p>Error: Post not found.</p></div>`);
      } else {
        _push(`<div class="full-post"><h1>${ssrInterpolate(unref(post).title)}</h1><img${ssrRenderAttr("src", unref(post).imageUrl)}${ssrRenderAttr("alt", unref(post).title)} class="full-post-image"><div class="post-meta"><span class="blog-card-date">Published on ${ssrInterpolate(formattedDate.value)}</span></div><p class="full-post-description">${ssrInterpolate(unref(post).description)}</p><div class="post-actions">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/blog",
          class: "back-to-blog-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to all posts`);
            } else {
              return [
                createTextVNode("Back to all posts")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/view/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-y0X-Ww8Q.mjs.map
