import { _ as __nuxt_component_0 } from './nuxt-link-CqW1ogP9.mjs';
import { ref, reactive, withAsyncContext, mergeProps, withCtx, createTextVNode, computed, toValue, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { D as hash } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { f as fetchDefaults, u as useNuxtApp } from './server.mjs';
import { u as useAsyncData } from './asyncData-B7QpExav.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    controller?.abort?.(new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const uploading = ref(false);
    const postId = parseInt(route.params.id);
    const post = ref(null);
    const form = reactive({
      title: "",
      description: "",
      imageUrl: "",
      date: ""
    });
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/blog/${postId}`, "$AJ-CHgtSFS")), __temp = await __temp, __restore(), __temp);
    post.value = data.value;
    if (post.value) {
      Object.assign(form, post.value);
    } else {
      router.push("/blog");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-page-container" }, _attrs))}><div class="form-content-wrapper"><h1>Edit Blog Post</h1>`);
      if (!post.value) {
        _push(`<div>Loading...</div>`);
      } else {
        _push(`<form><div class="form-group"><label for="title">Title</label><input type="text" id="title"${ssrRenderAttr("value", form.title)} required></div><div class="form-group"><label for="description">Description</label><textarea id="description" required>${ssrInterpolate(form.description)}</textarea></div><div class="form-group"><label for="image">Upload New Image (optional)</label><input type="file" id="image" accept="image/*"></div>`);
        if (uploading.value) {
          _push(`<div style="${ssrRenderStyle({ "color": "blue" })}">Uploading image...</div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.imageUrl) {
          _push(`<div style="${ssrRenderStyle({ "margin-top": "10px" })}"><p>Current/New Image Preview:</p><img${ssrRenderAttr("src", form.imageUrl)} alt="Post Image" style="${ssrRenderStyle({ "max-width": "200px", "max-height": "200px" })}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-group"><label for="date">Date</label><input type="date" id="date"${ssrRenderAttr("value", form.date)} required></div><div class="form-buttons"><button type="submit"${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""}>Update Post</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/blog/view/{{postId}}" }, {
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
        _push(`</div></form>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Do6XA686.mjs.map
