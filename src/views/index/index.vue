<style lang="sass">
@import './index';
</style>

<template>
<div id="index">
	<div class="mod_title3">
		这里是首页{{ nowtime }}哦ed
		<a href="javascript:;" v-link="{name: 'hello'}">hello</a>
	</div>
</div>
</template>

<script>
export default {
	name: 'index',
	computed: {
		nowtime () {
			return Number(new Date());
		}
	}
};
</script>
