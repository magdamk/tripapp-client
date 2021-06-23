<template lang="pl">
  <td>
    <span class="comment">
        <strong>Tytuł: </strong>{{comment.title}}
        <p><strong>Autor: </strong>{{comment.nick}}</p>
        <p><strong>Data wizyty: </strong>{{comment.dateOfVisit.slice(0,10)}}</p>
        <p><strong>Opinia: </strong>{{comment.content}}</p>
        <p><strong>Ocena: </strong><span v-if="comment.rate===5" class="good"><i class="material-icons">sentiment_very_satisfied</i></span>
         <span v-else-if="comment.rate===4" class="good"><i class="material-icons">sentiment_satisfied</i></span>
        <span v-else-if="comment.rate===1" class="bad"><i class="material-icons">sentiment_very_dissatisfied</i></span>
         <span v-else-if="comment.rate===2" class="bad"><i class="material-icons">sentiment_dissatisfied</i></span>
        <span v-else class="neutral"><i class="material-icons">sentiment_neutral</i></span></p>
    </span>
  </td>
  <td v-if="$store.state.user">
  
    <button v-bind:disabled="btnDisable" @click ="deleteComment(comment._id)" class="waves-effect waves-light btn-small red">{{buttonMark}}<i class="material-icons right">delete</i></button>
        
  </td>
</template>
<script>
import placeService from "@/services/placeService.js";
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  emits:['comment-list-change'],
  data(){
    return {
    buttonMark: "Usuń",
    btnDisable: false
    }
  },
   methods: {
    async deleteComment(id){
      if (id) { 
        await placeService.deleteComment(id);
        this.buttonMark = "Usunięty"
        this.btnDisable = true
        this.$emit('comment-list-change')
        }
    }
  },
};
</script>
<style>

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
