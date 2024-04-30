<template>
  <div id="text-editor">
    <div class="toolbar" v-if="editor">
      <div class="align-dropdown">
        <button class="dropbtn">Heading ▼</button>
        <div class="dropdown-content">
          <a
            v-for="index in 6"
            :key="index"
            :class="{ active: editor.isActive('heading', { level: index }) }"
            :style="{ fontSize: 20 - index + 'px' }"
            @click="onHeadingClick(index, $event)"
            role="button"
          >
            {{ index }}
          </a>
        </div>
      </div>

      <button
        v-for="({ slug, option, active, icon }, index) in textActions"
        :key="index"
        :class="{ active: editor.isActive(active) }"
        @click="onActionClick(slug, option, $event)"
      >
        <i :class="icon"></i>
      </button>
    </div>
    <div class="content-main">
      <editor-content :editor="editor" />
    </div>
    <div v-if="editor" class="footer">
      <span class="characters-count" :class="maxLimit ? limitWarning : ''">
        {{ charactersCount }}
        {{ maxLimit ? `/ ${maxLimit} characters` : "characters" }}
      </span>
      |
      <span class="words-count"> {{ wordsCount }} words </span>
    </div>
  </div>
</template>
  
  <script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CharacterCount from "@tiptap/extension-character-count";

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    maxLimit: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
      textActions: [
        { slug: "bold", icon: "ri-bold", active: "bold" },
        { slug: "italic", icon: "ri-italic", active: "italic" },
        { slug: "underline", icon: "ri-underline", active: "underline" },
        { slug: "strike", icon: "ri-strikethrough", active: "strike" },
        {
          slug: "align",
          option: "left",
          icon: "ri-align-left",
          active: { textAlign: "left" },
        },
        {
          slug: "align",
          option: "center",
          icon: "ri-align-center",
          active: { textAlign: "center" },
        },
        {
          slug: "align",
          option: "right",
          icon: "ri-align-right",
          active: { textAlign: "right" },
        },
        {
          slug: "align",
          option: "justify",
          icon: "ri-align-justify",
          active: { textAlign: "justify" },
        },
        { slug: "bulletList", icon: "ri-list-unordered", active: "bulletList" },
        { slug: "orderedList", icon: "ri-list-ordered", active: "orderedList" },
        { slug: "subscript", icon: "ri-subscript-2", active: "subscript" },
        {
          slug: "superscript",
          icon: "ri-superscript-2",
          active: "superscript",
        },
        { slug: "undo", icon: "ri-arrow-go-back-line", active: "undo" },
        { slug: "redo", icon: "ri-arrow-go-forward-line", active: "redo" },
        { slug: "clear", icon: "ri-format-clear", active: "clear" },
      ],
    };
  },
  computed: {
    charactersCount() {
      return this.editor.storage.characterCount.characters();
    },
    wordsCount() {
      return this.editor.storage.characterCount.words();
    },
    limitWarning() {
      const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
      const isMax = this.charactersCount === this.maxLimit;

      if (isCloseToMax && !isMax) return "warning";
      if (isMax) return "danger";

      return "";
    },
  },
  watch: {
    modelValue: {
      immediate: true, // 컴포넌트가 마운트될 때 감시자를 즉시 실행합니다.
      handler(value) {
        if (this.editor && this.editor.getHTML() !== value) {
          // editor의 내용과 prop 값이 다를 때만 setContent를 호출합니다.
          this.editor.commands.setContent(value);
        }
      },
    },
  },
  methods: {
    onActionClick(slug, option = null, event) {
      event.preventDefault(); // 폼 제출 방지
      const vm = this.editor.chain().focus();
      const actionTriggers = {
        bold: () => vm.toggleBold().run(),
        italic: () => vm.toggleItalic().run(),
        underline: () => vm.toggleUnderline().run(),
        strike: () => vm.toggleStrike().run(),
        bulletList: () => vm.toggleBulletList().run(),
        orderedList: () => vm.toggleOrderedList().run(),
        align: () => vm.setTextAlign(option).run(),
        subscript: () => vm.toggleSubscript().run(),
        superscript: () => vm.toggleSuperscript().run(),
        undo: () => vm.undo().run(),
        redo: () => vm.redo().run(),
        clear: () => {
          vm.clearNodes().run();
          vm.unsetAllMarks().run();
        },
      };

      actionTriggers[slug]();
    },
    onHeadingClick(index, event) {
      event.preventDefault(); // 폼 제출 방지
      const vm = this.editor.chain().focus();
      vm.toggleHeading({ level: index }).run();
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
        CharacterCount.configure({
          limit: this.maxLimit,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML()); //현재 HTML을 부모 컴포넌트에 보냅니다.
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
  
<style lang="less" scoped>
#text-editor {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  width: 100%;

  .toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #e1e1e1;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      font-size: 20px;
      background: #fff;
      color: #6e6e6e;
      border: none;
      border-radius: 2px;
      margin: 0.5em 4px;
      -webkit-appearance: none;
      cursor: pointer;

      &.active {
        background: #e1e1e1;
        color: #fff;
      }
    }
  }

  .align-dropdown {
    position: relative;
    display: inline-block;
    margin: 0.5em 8px;

    > button {
      height: 32px;
      background: #fff;
      color: #6e6e6e;
      border: none;
      border-radius: 2px;
      -webkit-appearance: none;
      cursor: pointer;
    }

    > .dropdown-content {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      border: 1px solid #e1e1e1;
      outline: 1px solid #fff;
      border-radius: 2px;
      background-color: #fff;
      z-index: 1;

      a {
        display: block;
        padding: 6px 12px;
        text-align: center;
        cursor: pointer;

        &:hover,
        &.active {
          background: #e1e1e1;
          color: #fff;
        }
      }
    }

    &:hover .dropdown-content {
      display: block;
    }
  }

  .divider {
    width: 1px;
    height: 24px;
    background: #e1e1e1;
    margin-right: 6px;
  }

  .footer {
    color: #808080;
    font-size: 14px;
    text-align: right;
    padding: 6px;

    .characters-count {
      &.warning {
        color: orange;
      }

      &.danger {
        color: red;
      }
    }
  }

  .content-main {
    padding: 20px;
    height: 20vh;
    overflow-y: scroll;
  }

  .ProseMirror {
    padding-left: 0.5em;
    padding-right: 0.5em;
    outline: none;
    width: 80%;

    > p:first-child {
      margin-top: 0.5em;
    }

    > h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:first-child {
        margin-top: 0.5em;
      }
    }
  }
}
</style>