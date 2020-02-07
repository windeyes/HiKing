<template>
  <div>
    <hikinghead/>
    <nuxt />
    <hikingfoot/>
  </div>
</template>
<script>
import hikinghead from '@/components/hikinghead'
import hikingfoot from '@/components/hikingfoot'

export default {
  components: {
    hikinghead,hikingfoot
  }
}
</script>
<style>
*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}
a:hover{

}
em,i{
  font-style: normal;
}
</style>
