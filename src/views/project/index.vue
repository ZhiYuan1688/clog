<template>
  <div class="w-full h-full flex items-center justify-between">
    <!-- 项目列表 -->
    <div
      class="w-1/4 h-full p-4 box-border border-r border border-r-solid border-gray-300"
    >
      <!-- div.搜索 -->
      <form
        :model="form"
        class="flex items-center justify-between gap-2"
        @submit="handleSubmit"
      >
        <a-input type="text" v-model="text" placeholder="搜索..">
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </form>
      <p class="text-lg underline underline-offset-8">项目</p>
      <!-- div.项目列表 -->
      <div>
        <ul class="m-0 p-0 flex flex-col justify-center gap-4">
          <li class="list-none flex items-center gap-3" v-for="p in projectList" @click="checkProject(p)">
            <div
              class="min-w-48px min-h-48px bg-#F9F9F9 rounded-lg relative flex "
            >
            <!-- loader -->
              <div class="loader absolute top--1.5 left--1.5"></div>
              <!-- 图片 -->
             <img class="w-32px h-32px m-auto" :src="p.icon" alt="">
            </div>
            <div class="flex flex-col justify-center gap-2">
              <div class="flex items-center">
                <span class="color-gray-600">{{ p.projectName }}</span>
              </div>
              
              <span class="text-sm color-gray wrap"
                >{{p.desc}}</span
              >
            </div>
          </li>

          <!-- 添加更多项目... -->
        </ul>
      </div>
    </div>
    <!-- 项目详情 -->
    <div class="h-full w-3/4  box-border">
      <!-- 项目介绍 -->
      <div class="flex  gap-2">
        <!-- 项目名字，描述，技术栈，进度监控 -->
       
        <div class="flex-1 items-center justify-center">
          <!-- 项目标题 技术栈 跟进 状态等 -->
          <div class="w-full flex items-center justify-between gap-2 border border-b-gray-300 border-b-solid">
            <div class="w-4/5 flex flex-col items-baseline justify-center px-4">
              <div class="flex items-center gap-2">
                <p class=" text-18px">{{ item.projectName }}</p>
                <span>|</span>
                <span class="color-gray text-sm wrap">{{ item.desc }}</span>
              </div>
              
              <ul class="mt-0 p-0 flex items-center gap-4 ">
                <li class="list-none flex items-center justify-center gap-1 cursor-pointer" v-for="t in item.tech">
                  <div class=" min-w-28px min-h-28px bg-#f3f3f3 rounded-50% flex">
                    <span class="m-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#00DC82" d="M17.708 25h10.409a1.89 1.89 0 0 0 1.631-.95a1.913 1.913 0 0 0 0-1.9L22.756 9.936a1.87 1.87 0 0 0-3.261 0l-1.788 3.125l-3.494-6.111a1.871 1.871 0 0 0-3.262 0l-8.7 15.2a1.912 1.912 0 0 0 .69 2.595c.286.167.61.255.941.255h6.534c2.589 0 4.498-1.147 5.811-3.385l3.19-5.572l1.708-2.982l5.127 8.957h-6.835L17.707 25Zm-7.398-2.985l-4.56-.001l6.836-11.942l3.41 5.97l-2.283 3.992c-.873 1.452-1.864 1.981-3.403 1.981Z"/></svg></span>
                  </div>
                  <span class="text-sm color-gray-3">{{ t }}</span>
                </li>
              </ul>
            </div>
            
            <div class="w-1/5 flex items-center justify-between">
              <a-button class="!w-36px !h-36px !rounded-50% flex "><span class="m-auto"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="m20.3 16.5l-3.9 3.9l-4-3.9l1.1-1.1l2.1 2.1v-5.7h1.5v5.8l2.1-2.1Zm-16.8-.8l2.7 2.7L9 15.7v4.4h1.5V12l-4.3 4.3L2 12v8.1h1.5Z"/><path fill="#f9ac00" d="m28.8 20l-3.1-3.1l-3.1 3.1l-1-1.1l3.1-3.1l-3.2-3.2l1.1-1l3.1 3.2l3.2-3.2l1.1 1l-3.2 3.2l3.1 3.1Z"/></svg></span>

              </a-button>
              <a-button class="!w-36px !h-36px !rounded-50% flex"><span class="m-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"/></svg></span></a-button>
              <a-button class="!w-36px !h-36px !rounded-50% flex"><span class="m-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#000000"><path fill-rule="evenodd" d="M23 12c0-1.035-.53-2.07-1.591-2.647L8.597 2.385C6.534 1.264 4 2.724 4 5.033V12h19Z" clip-rule="evenodd"/><path d="m8.597 21.614l12.812-6.967A2.988 2.988 0 0 0 23 12H4v6.967c0 2.31 2.534 3.769 4.597 2.648Z" opacity=".5"/></g></svg></span></a-button>
            </div>

          </div>
          
        </div>
        <!-- 项目数据总览（已完成进度，待完成进度，总结） -->
        <div></div>
      </div>
      <!-- 项目进度 -->
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const text = ref("");
const form = ref({});
// 搜索
const handleSubmit = (e) => {
  console.log(text.value);
};
// 项目列表（名字，描述，技术栈，icon，进度监控）
const projectList = ref([
  {
    projectName: 'Clog', 
    desc: '个人博客日志系统',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    tech: ['Vue', 'Vite', 'Ant Design Vue', 'Node.js', ],
    progress: [{
      date: '2021-10-01',
      todo: '项目初始化',
      done: true
    },
    {
      date: '2021-10-02',
      todo: '项目初始化',
      done: false
    }
  ]
  },
  {
    projectName: 'test', 
    desc: '逆向开发者工具',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    tech: ['Vue', 'Vite', 'Ant Design Vue', 'Node.js', 'MongoDB'],
    progress: [{
      date: '2021-10-01',
      todo: '项目初始化',
      done: true
    },
    {
      date: '2021-10-02',
      todo: '项目初始化',
      done: false
    }
  ]
  }
]);
// 实现查看详情
// 1.设置被选中项目
const item = ref(projectList.value[0]);
// checkProject函数（点击项目列表时右侧显示该项目的详情）
// 2.设置被选中项目的详情
const checkProject = (project) => {
  item.value = project
};
</script>

<style scoped>
.wrap {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
