<style lang="sass">
@import './hello';
</style>

<template>
<div id="index">
	<div class="mod_title2">
		hello world!
		<a href="javascript:;" v-link="{name: 'index'}">index</a>
	</div>
</div>
</template>

<script>
export default {
	name: 'hello'
};
</script>
