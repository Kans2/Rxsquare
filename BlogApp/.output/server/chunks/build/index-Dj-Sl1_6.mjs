import { _ as __nuxt_component_0 } from './nuxt-link-CqW1ogP9.mjs';
import { withAsyncContext, mergeProps, withCtx, createTextVNode, unref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'vue-router';

const _sfc_main$1 = {
  __name: "BlogPostCard",
  __ssrInlineRender: true,
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ["post-deleted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    computed(() => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(props.post.date).toLocaleDateString("en-US", options);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))} data-v-0c45f994><img${ssrRenderAttr("src", __props.post.imageUrl)}${ssrRenderAttr("alt", __props.post.title)} data-v-0c45f994><div class="blog-card-content" data-v-0c45f994><h2 data-v-0c45f994>${ssrInterpolate(__props.post.title)}</h2><p data-v-0c45f994>${ssrInterpolate(__props.post.description)}</p><div class="card-footer" data-v-0c45f994><span class="blog-card-date" data-v-0c45f994>${ssrInterpolate(__props.post.date)}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/blog/view/${__props.post.id}`,
        class: "view-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Click here to view full blog `);
          } else {
            return [
              createTextVNode(" Click here to view full blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="actions" data-v-0c45f994>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/blog/edit/${__props.post.id}`,
        class: "edit-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Edit`);
          } else {
            return [
              createTextVNode("Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="delete-btn" data-v-0c45f994>Delete</button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogPostCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0c45f994"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("posts", () => $fetch("/api/blog"))), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      console.error("Failed to fetch posts:", error.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BlogPostCard = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-container" }, _attrs))}><h1>All Blog Posts</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog/new",
        class: "add-post-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add New Post`);
          } else {
            return [
              createTextVNode("Add New Post")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(pending)) {
        _push(`<div>Loading posts...</div>`);
      } else if (!unref(data) || unref(data).length === 0) {
        _push(`<div>No blog posts found.</div>`);
      } else {
        _push(`<div class="blog-list"><!--[-->`);
        ssrRenderList(unref(data), (post) => {
          _push(ssrRenderComponent(_component_BlogPostCard, {
            key: post.id,
            post,
            onPostDeleted: unref(refresh)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dj-Sl1_6.mjs.map
