<template lang="html">
    <div>
		<router-view></router-view>
    </div>
</template>

<script>
    export default {
        created() {
            window.addEventListener('hashchange', () => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        }
    }
</script>
