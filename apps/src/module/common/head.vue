<template lang="html">
    <div class="header">
		<ul class="logo">
			<li><img src="../../assets/images/logo3.png"></li>
		</ul>
		<ul class="nav" style="width: 30%;">
			<li>
				<a href="/index.html">首页 </a>
			</li>
			<li>
				<a href="/products.html">产品展示 </a>
			</li>
			<li>
				<a href="/aboutus.html">关于我们 </a>
			</li>
			<li>
				<a href="/tellme.html">联系我们 </a>
			</li>
		</ul>
	</div>
</template>
<script></script>
<style scoped>
	ul,li,body,div {
		margin: 0; padding: 0;
	}
	ul,li {
		list-style: none;
	}
	a,p {
		text-decoration:none;
	}
	.header {
       width: 100%; height: 54px; line-height: 54px; background: #272727;
    }
    .header .logo {
        float: left; width: 13%; text-align: center; margin-left: 3%;
    }
    .header .logo li {
        height: 96px;
    }
    .header .logo img {
        margin-left: 50px
    }
	.header .nav {
		float: right; width: 30%;
	}
	.header .nav li {
		float: left;width: 20%; text-align: center;
	}
	.header .nav a {
		color: black; color: white; font-size: 18px;
	}
	.header .nav>li>a {
	     padding: 0; 
	}
	.nav>li>a:hover{
		background: #272727;
	}
</style>