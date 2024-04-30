<template>
  <div class="backimg">
    <div class="topbar">
      <div class="plancontainer">
          <span class="alldayplan">전체일정</span>
          <span>1일차</span>
          <span>2일차</span>
          <span>3일차</span>
      </div>
      <div class="gohomecontainer">
        <div class="fixbtn">편집</div>
        <div class="savebtn">저장</div>
      </div>
    </div>
    <div class="plancoursecon" ref="plancoursecon">
      <div class="day-section">
        <div class="content-section">
          <div>
            <span class="planday">1일차</span>
            <span class="planday2">2024-05-10(금)</span>
          </div>
          <div class="planturn">
            <span class="planturnnumber">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line1"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line2"></div>
          <div class="planturn">
            <span class="planturnnumber">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line3"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line4"></div>
          <div class="planturn">
            <span class="planturnnumber">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line5"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line6"></div>
          <div class="planturn">
            <span class="planturnnumber">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line7"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon2" icon="fa-solid fa-circle" />
          </div>
        </div>
        <div class="content-section">
          <div>
            <span class="planday">2일차</span>
            <span class="planday2">2024-05-11(토)</span>
          </div>
          <div class="planturn">
            <span class="planturnnumber2">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line1"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line2"></div>
          <div class="planturn">
            <span class="planturnnumber2">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line3"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line4"></div>
          <div class="planturn">
            <span class="planturnnumber2">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line5"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line6"></div>
          <div class="planturn">
            <span class="planturnnumber2">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line7"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon2" icon="fa-solid fa-circle" />
          </div>
        </div>
        <div class="content-section">
          <div>
            <span class="planday">3일차</span>
            <span class="planday2">2024-05-12(일)</span>
          </div>
          <div class="planturn">
            <span class="planturnnumber3">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line1"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line2"></div>
          <div class="planturn">
            <span class="planturnnumber3">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line3"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line4"></div>
          <div class="planturn">
            <span class="planturnnumber3">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line5"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon" icon="fa-solid fa-car" />
            <span style="color: grey;">&nbsp;&nbsp;23분&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-chevron-right" /></span>
          </div>
          <div class="line6"></div>
          <div class="planturn">
            <span class="planturnnumber3">1</span>
            <span class="plantime">11:00~11:00</span>
          </div>
          <div class="line7"></div>
          <span class="placetitle1">명소</span>
          <span class="placetitle2">제주국제공항</span>
          <img class="planimg" :src="require('@/assets/images/jejuairport.png')">
          <div>
            <font-awesome-icon class="icon2" icon="fa-solid fa-circle" />
          </div>
        </div>
      </div>
    </div>
    <div class="drag-icon-container"
          @mousedown.prevent="startDrag" 
          @mouseup.prevent="endDrag">
        <font-awesome-icon icon="fa-solid fa-bars" class="drag-icon"/>
      </div>
  </div>
</template>

<script>
import 'material-icons/iconfont/material-icons.css';

export default {
  data() {
    return{
        isDragging: false,
        startY: 0,
        startHeight: 700,
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startY = event.clientY;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.endDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      const currentY = event.clientY;
      const diffY = currentY - this.startY;
      let newHeight = this.startHeight + diffY; // 최소 높이 제한 없음
      this.$refs.plancoursecon.style.height = `${newHeight}px`;
      event.preventDefault();
    },
    endDrag() {
      if (this.isDragging) {
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.endDrag);
        this.isDragging = false;
        this.startHeight = parseInt(this.$refs.plancoursecon.style.height, 10);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.backimg {
  background-image: url('~@/assets/images/map.jpg');
  background-size: cover;
  background-position: center;
  margin: -8px -8px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 150px;
}

.topbar{
  background-color: white;
  display:flex;
  width:100%;
  height: 100px;
  border-bottom: 2px solid rgb(189, 189, 189);
}
.plancontainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 100px;
  border-right: 2px solid rgb(189, 189, 189);
  border-top: 2px solid rgb(189, 189, 189);
  width: calc(100%);
  font-size: 20px;
}

.gohomecontainer{
  display: flex;
  align-items: center;
  justify-content:center;
  width: 20%;
  height: 100px;
  border-right: 2px solid rgb(189, 189, 189);
  border-top: 2px solid rgb(189, 189, 189);
  margin-left: auto;
}

.alldayplan{
  display:flex;
  background-color: rgb(85, 85, 204);
  color: white;
  width:120px;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content:center;
}

.fixbtn{
  display:flex;
  align-items: center;
  justify-content:center;
  font-size:20px;
  background-color: white;
  width:90px;
  height:50px;
  border-radius:10px;
  border: 1px solid #000000;
}

.savebtn{
  display:flex;
  margin-left:10px;
  align-items: center;
  justify-content:center;
  font-size:20px;
  background-color: rgb(0, 0, 0);
  color:white;
  width:120px;
  height:50px;
  border-radius:10px;
}

.plancoursecon {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-height: 700px;
  overflow-y: auto;
  background-color: #f8f8f8;
}

.day-section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.drag-icon {
  cursor: ns-resize;
}

.drag-icon-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  padding: 10px 0;
  width: 100%; // 화면 너비에 맞추어 조정
  height: 13px;
  border-top: 1px solid #ccc;
}

.content-section {
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1;
}

.planday {
  margin-right:270px;
  margin-left:25px;
  font-size:25px;
  font-weight: bold;
}

.planday2 {
  color:rgb(163, 163, 163)
}

.planturn {
  display:flex;
  margin-top:40px;
  flex-direction: row; 
}

.planturnnumber {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(253, 74, 74);
  color:white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 30px;
}

.planturnnumber2 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(20, 156, 38);
  color:white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 30px;
}

.planturnnumber3 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(94, 48, 202);
  color:white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 30px;
}

.plantime {
  display: flex;
  margin-left:30px;
  color: rgb(160, 160, 160);
}

.planimg{
  display: flex;
  margin-left: 370px;
  margin-top: -50px;
  border-radius: 5px;
  width: 93px;
  height: 93px;
}

.line1 {
  position:absolute;
  margin-left:40px;
  margin-top:94px;
  width: 2px;
  height: 105px;
  background-color: #adadad;
}

.line2 {
  position:absolute;
  margin-left:40px;
  margin-top:225px;
  width: 2px;
  height: 40px;
  background-color: #adadad;
}

.line3 {
  position:absolute;
  margin-left:40px;
  margin-top:288px;
  width: 2px;
  height: 105px;
  background-color: #adadad;
}

.line4 {
  position:absolute;
  margin-left:40px;
  margin-top:419px;
  width: 2px;
  height: 40px;
  background-color: #adadad;
}

.line5 {
  position:absolute;
  margin-left:40px;
  margin-top:482px;
  width: 2px;
  height: 105px;
  background-color: #adadad;
}

.line6 {
  position:absolute;
  margin-left:40px;
  margin-top:613px;
  width: 2px;
  height: 40px;
  background-color: #adadad;
}

.line7 {
  position:absolute;
  margin-left:40px;
  margin-top:676px;
  width: 2px;
  height: 108px;
  background-color: #adadad;
}

.icon {
  z-index: 1;
  color: #6e6e6e;
  font-size: 24px;
  margin-left:28px;
}
.icon2 {
  z-index: 1;
  color: #6e6e6e;
  font-size: 18px;
  margin-left:31px;
}

.placetitle1, .placetitle2 {
  display: flex;
  margin-top: 7px;
  margin-left: 80px;
}

.placetitle1 {
  font-size:17px;
  color:rgb(161, 161, 161)
}

.placetitle2 {
  font-size:21px;
  font-weight: bold;
}

::-webkit-scrollbar {
  width: 7px;
  height: 10px;
  margin-right: 20px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>