<template lang="pl">
    <div>
    <p><strong>Średnia ocen: </strong><span :class="{'good': average>3, 'bad':average<3, 'neutral':average==3}">{{average}}/5</span></p>
    <table class="responsive-table">
      <thead>
        <tr>
          <th>Komantarz</th>
          <th  v-if="$store.state.user">Akcja</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(comment,index) in comments" v-bind:key="index">
            <Comment :comment="comment" @comment-list-change="commentListChange"/>
        </tr>  
      </tbody>
    </table>    
    </div>
</template>
<script>
import Comment from "@/components/Comment.vue";
export default {
  name: "CommentList",
  components: { Comment },
  props: {
    average:{
      type: Number,
      required: true
    },
    comments: {
      type: Array,
    },
  },
  
  emits:['comment-list-change'],
  methods:{
    commentListChange(){
      this.$emit('comment-list-change');
    }
  }
 
};
</script>
<style scoped>
.good {
  color: green;
}
.bad {
  color: red;
}
.neutral {
  color: rgb(255, 230, 0);
}
</style>
