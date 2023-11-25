<template>
  <div class="fixed bottom-0 right-0 m-8 z-1">
    <a-button type="primary" shape="circle" @click="handleClick">
      <icon-plus />
    </a-button>
  </div>
  <a-modal
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确定"
    cancelText="取消"
    unmountOnClose
  >
    <template #title> 添加Todo </template>
    <div>
      <a-form :model="todoList" layout="vertical">
        <a-form-item field="name" label="标题">
          <a-input v-model="name" placeholder="输入任务标题..." />
        </a-form-item>
        <a-form-item field="tag" label="标签">
          <a-mention
            v-model="tag"
            :data="[
              'CSS',
              'HTML',
              'JavaScript',
              'Vue3',
              'Rust',
              'React',
              '面试圣经',
            ]"
            placeholder="输入任务标签..."
          />
        </a-form-item>
        <a-form-item field="link" label="教程">
          <a-input v-model="link" placeholder="输入教程链接..." />
        </a-form-item>
        <a-form-item field="more" label="描述">
          <a-textarea
            v-model="more"
            placeholder="输入任务描述..."
            :auto-size="{
              minRows: 3,
              maxRows: 3,
            }"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <div class="flex flex-col gap-6 relative" @keydown="handleKeyDown">
    <!-- 标题 筛选框 搜索框 -->
    <div class="px-4">
    <div class="flex items-center justify-between flex-wrap ">
      <h1 class="flex items-center gap-3">
        <img class="w-32px h-32px" :src="showSvg('box')" alt="icon" />
        碎片
      </h1>
      <!-- 搜索框 -->
      <div class="flex items-center justify-between gap-4">
        <a-input
          ref="searchElement"
          class="!w-400px !h-42px !rounded-12px !bg-#fff !border-#F5F5F5 !hover:bg-#f5f5f5"
          placeholder="搜索..."
          v-model="search"
        >
          <template #prefix>
            <icon-search class="!color-#4F46E5 !h-1.5em !w-1.5em" />
          </template>
          <template #suffix>
            <span class="color-gray text-content-disabled">⌘+F</span>
          </template>
        </a-input>
        <!-- 筛选框 -->
        <div
          class="border-#F5F5F5 b-solid w-200px h-42px flex items-center justify-between !rounded-12px"
        >
          <a-dropdown class="mt-1 w-200px !left-821px shadow-blue">
            <a-button class="!bg-#fff !h-full !rounded-12px !hover:bg-#f5f5f5"
              >排序顺序：{{ filter }}</a-button
            >
            <template #content>
              <a-doption
                @click="test1"
                class="!mx-2 !w-auto hover:rounded-12px"
                v-for="o in options"
              >
                <div class="flex items-center justify-center gap-2">
                  <img :src="showSvg(o.icon)" alt="" />
                  <span>{{ o.text }}</span>
                </div>
              </a-doption>
            </template>
          </a-dropdown>
          <a-divider direction="vertical" class="!m-0 !p-0" />

          <div
            class="h-full w-full m-auto hover:bg-#f5f5f5 hover:rounded-12px flex"
          >
            <img class="m-auto" :src="showSvg('upsort')" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 常用技术文档官网 -->
    <div class="flex items-center justify-center flex-wrap gap-8 mt-8 ">
      <div class="flex flex-col justify-center  items-center" v-for="guide in guides">
     <a class="block w-48px h-48px bg-#f3f3f3 rounded-30% flex" :href="guide.link" target="\_blank">
       <img class="w-32px h-32px m-auto" :src="showSvg(guide.logo.trim())" alt=""/>
     </a>
      <p>{{ guide.name }}</p> 
      </div>
    </div>
  </div>
    <!-- 根据tag显示 -->
    <div class="b-b-#f3f3f3 b-b-solid px-4">
    
      <h2>逾期</h2>

      <ul  class="flex flex-wrap p-0 items-center gap-2">
        <li
          class="min-w-192px max-w-192px max-h-36px list-none flex-grow flex items-center gap-2 hover:bg-red hover:color-#fff hover:rounded-10px px-4"
          draggable="true"
          v-for="(o, index) in overdue"
          @click="complete(o)"
         
        >
          <span class="flex items-center"
            ><img :src="showSvg('uncomplete')" alt="icon"
          /></span>
          <p class="line-clamp-1 font-semibold text-content-primary">
            {{ o.name }}
          </p>
        </li>
       
      </ul>
 <div
        class="text-sm color-gray-400 flex items-center cursor-pointer"
        @click="showOverdue"
      >
        <span>查看更多逾期任务</span>
        <img :src="showSvg('right-line')" alt="" />
      </div>
    </div>
   
    <div v-for="(group, tag) in groupedTodos" :key="tag" class="b-b-#f3f3f3 b-b-solid px-4">
      <h2 class="sticky top-0 z-1000">{{ tag }}</h2>

      <ul class="flex flex-wrap p-0 items-center gap-2">
        <li
          class="min-w-192px max-w-192px max-h-36px list-none flex-grow flex items-center gap-2 hover:color-#fff hover:rounded-10px px-4"
          draggable="true"
          v-for="i in group"
          @click="complete(i)"
          :class="{
            'hover:bg-green ': i['status'],
            'hover:bg-red ': !i['status'],
          }"
        >
          <span class="flex items-center" v-if="i.status"
            ><img :src="showSvg('complete')" alt="icon"
          /></span>
          <span class="flex items-center" v-else
            ><img :src="showSvg('uncomplete')" alt="icon"
          /></span>
          <p class="line-clamp-1 font-semibold text-content-primary">
            {{ i.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { require } from "@/utils/require.js";
import { Message, Notification } from "@arco-design/web-vue";
import { computed, onMounted, onUnmounted, ref,watch } from "vue";
// 显示静态资源下图片
const showSvg = (svgName) => {
  return require(`@/assets/icons/${svgName}.svg`);
};
const todoList = ref([
  {
    id: 1,
    name: "CSS样式选择器",
    date: "2023-11-20 00:00:00",
    tag: "CSS",
    status: true,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
  {
    id: 2,
    name: "html基础选择",
    date: "2023-11-20 01:00:00",
    tag: "html",
    status: false,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
  {
    id: 3,
    name: "是打撒是",
    date: "2023-11-20 01:00:00",
    tag: "html",
    status: false,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
  {
    id: 4,
    name: "是哒哒哒哒·",
    date: "2023-11-20 01:00:00",
    tag: "html",
    status: false,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
  {
    id: 5,
    name: "打算打撒多少岁啊啊",
    date: "2023-11-20 01:00:00",
    tag: "html",
    status: false,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
  {
    id: 5,
    name: "打算打撒多少岁啊啊",
    date: "2023-11-20 01:00:00",
    tag: "html",
    status: false,
    link: "www.baidu.com",
    docs: "www.baidu.com",
    more: "学习并使用CSS样式选择器",
  },
]);
const name = ref("");
const tag = ref("");
const link = ref("");
const more = ref("");
const visible = ref(false);
const completeTodo = ref(0);
const unCompleteTodo = ref(0);
const frontendTodo = ref(0);
const vueTodo = ref(0);
const reactTodo = ref(0);
const nextTodo = ref(0);
const rustTodo = ref(0);
// 工具文档
const guides = [
{
    name:"MDN",
    link:"https://developer.mozilla.org/zh-CN/",
    logo:"mdn"
  },
  {
    name: "Vite",
    link: "https://cn.vitejs.dev/",
    logo: "vite",
  },
  {
    name: "Vue3.js",
    link: "https://v3.cn.vuejs.org/",
    logo: "vue",
  },
  {
    name: "React.js",
    link: "https://react.docschina.org/",
    logo: "react",
  },
  {
    name:"Typrscript",
    link:"https://www.typescriptlang.org/zh/",
    logo:"typescript"
  },
  {
    name:"Next.js",
    link:"https://nextjs.org/",
    logo:"next"
  },
  {
    name:"Nuxt.js",
    link:"https://www.nuxtjs.cn/",
    logo:"nuxt"
  },
  {
    name: "Rust",
    link: "https://www.rust-lang.org/zh-CN/",
    logo: "rust",
  },
  {
    name:"Tauri",
    link:"https://tauri.studio/zh-CN/",
    logo:"tauri"
  },



  {
    name: "Arco Design",
    link: "https://arco.design/",
    logo: "arco",
  }
 
]
// 逾期
const overdue = computed(() => {
  // 返回逾期的任务（即时间》=1天未完成的任务）
  let now = new Date().toLocaleString();
  now = new Date(now).getTime();

  // const date = new Date();
  return todoList.value.filter((i) => {
    const date = new Date(i.date).getTime();

    return !i.status && now - date >= 8640000;
  });
}, {});

// 查看更多逾期
const moreOverdue = ref(4);
const showOverdue = () => {
  moreOverdue.value += 4;
};
// 筛选
const filter = ref("默认排序");
const options = [
  { id: 1, icon: "moren", text: "默认顺序" },
  { id: 2, icon: "addtime", text: "添加时间" },
  { id: 3, icon: "complete", text: "已经完成" },
  { id: 4, icon: "uncomplete", text: "等待完成" },
];
const test1 = (e) => {
  filter.value = e.target.innerText;
};
// 搜索
const search = ref("");
const searchElement = ref(null);
// 监听ctrl + f
onMounted(() => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "f") {
      event.preventDefault();
      // 聚焦到输入框
      searchElement.value.focus();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
});
// 分类显示
// 创建一个计算属性，该属性将待办事项按标签分组
const groupedTodos = computed(() => {
  // 使用reduce方法将待办事项列表(todoList.value)转换为一个对象，该对象的键是标签名，值是具有相同标签的待办事项数组
  return todoList.value.reduce((groups, todo) => {
    // 将标签转换为大写，以便不区分大小写
    const tag = todo.tag.toUpperCase();
    // 如果这个标签的分组还不存在，就创建一个新的数组
    if (!groups[tag]) {
      groups[tag] = [];
    }
    // 将当前待办事项添加到其标签的分组中
    groups[tag].push(todo);
    // 返回更新后的分组对象
    return groups;
  }, {}); // 初始值是一个空对象
});
// 打开弹窗
const handleClick = () => {
  visible.value = true;
};
// 添加todo
const handleOk = () => {
  const fields = [name, tag, link, more];
  if (fields.some((field) => field.value === "")) {
    Message.error("请填写完整信息！");
    return;
  }

  if (todoList.value.filter((i) => !i.status).length >= 200) {
    Message.error("贪多嚼不烂！");
    visible.value = false;
    return;
  }

  const id = todoList.value.length + 1;
  // 时间格式为2021-10-01 00:00:00
  const date = new Date().toLocaleString();

  const todo = {
    id,
    name: name.value,
    date,
    status: false,
    docs: "",
    tag: tag.value,
    link: link.value,
    more: more.value,
  };

  todoList.value.push(todo);
  visible.value = false;
  fields.forEach((field) => (field.value = ""));
};
// 监控todoList的变化，实时计算完成任务数和未完成任务数
const percentag = computed(() => {
  return (1 / todoList.value.length) * 100;
});

// 操作任务
const complete = (i) => {
  if (i["status"]) {
    Notification.info("该任务已完成");
    return;
  }
  i["status"] = true;
};
// 取消弹窗
const handleCancel = () => {
  visible.value = false;
};
</script>

<style scoped>
.blursm {
  filter: blur(1.5px);
}
.blursm:hover {
  filter: none;
  transform: scale(1.05, 1.05);
}
</style>
