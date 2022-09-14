<script lang="ts" setup>

	import router from '@/router'

	let error_code = router.currentRoute.value.params.code

</script>

<template>
	<div>
		
		Erreur {{error_code}}
	
		<template v-if="error_code=='418'">
		, je suis une théière 🫖
		</template>
	</div>
	
</template>