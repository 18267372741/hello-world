<template lang="html">
	<my-head></my-head>
	<div class="register clearfix">
		<div class="title">
			<h3>工作室注册</h3>
			<h4>Workshop  Sign Up</h4>
		</div>

		<form class="form-horizontal">
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">工作室名称</label>
					<div class="col-sm-5">
						<input v-model="register.name" type="text" class="form-control" placeholder="">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">工作室昵称</label>
					<div class="col-sm-5">
						<input v-model="register.nickName" type="text" class="form-control" placeholder="">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">手机号码</label>
					<div class="col-sm-5">
						<input v-model="register.account" type="number" class="form-control" placeholder=""> 
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">密码</label>
					<div class="col-sm-5">
						<input v-model="register.password" type="password" class="form-control" placeholder="">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">确认密码</label>
					<div class="col-sm-5">
						<input v-model="register.surePassword" type="password" class="form-control" placeholder="">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">验证码</label>
					<div class="col-sm-3">
						<input v-model="register.code" type="number" class="form-control">
					</div>
					<div class="col-sm-2">
						<input v-if="btnCode.send" @click="getCode" type="button" class="btn btn-primary" value="获取验证码">
						<input v-if="btnCode.stop" type="button" class="btn btn-info" value="{{btnCode.num}}秒后可获取">
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">营业范围</label>
					<div class="col-sm-5">
						<label class="checkbox-inline">
							<input v-model="register.xiupian" type="checkbox">修片
						</label>
						<label class="checkbox-inline">
							<input v-model="register.sheji" type="checkbox">设计
						</label>
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">头像</label>
					<div class="col-sm-3 qiniu"> </div>
					<div class="col-sm-5">  
						<img :src="register.logo" class="img-thumbnail" alt="头像" />
					</div>
				</div>
			</div>

			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding">有效证件(限大1M)</label>
					<div class="col-sm-3 qiniu">
						<qiniu :options="identity"></qiniu>
					</div>
					<div class="col-sm-5">
						<img style="width:100%;display: inline-block;height: 230px" :src="qnyUrl+register.identity" class="img-thumbnail" alt="身份证" />
						<img style="width:100%;display: inline-block;height: inherit;" src="../assets/shenfencade.jpg" class="img-thumbnail" title="身份证样图" /> 
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10">
					<label class="col-sm-5 control-label text-right no-padding"></label>
					<div class="col-sm-7">
						<label class="checkbox-inline">
				        	<input v-model="register.agree" type="checkbox">
				        	<span style="color: blue;">同意注册协议</span>
                            <span data-toggle="modal" data-target=".workRoom"><a href="javascript:;">查看协议</a></span>
				        </label>
					</div>
				</div>
			</div>
			
			<div style="overflow: hidden;">
				<div class="form-group col-sm-10" style="margin-bottom: 80px;">
					<label class="col-sm-5 control-label text-right no-padding"></label>
					<div class="col-sm-5">
						<input @click="verificat" type="button" class="btn btn-primary sure" value="确定注册">
					</div>
				</div>
			</div>
			
		</form>
		<div class="weizhi">
			<div class="QR"></div>
			<p>请扫描二维码绑定微信账号</p>
		</div>
	</div>
    <div class="modal fade workRoom" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 6193px;"><p style="    text-align: center;"><strong><span style="font-family: 微软雅黑;font-size: 24px"><span style="font-family:微软雅黑">上海金尚设计工坊平台服务协议<br>
                    </span></span></strong></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">上海金尚设计工坊：</span>www.17xiutu.com（以下简称“本网站”）依据《上海金尚设计工坊平台服务协议》（以下简称“本协议”）的规定提供服务，本协议具有合同效力。用户注册时，请您认真阅读本协议，审阅并接受或不接受本协议（未成年人应在法定监护人陪同下审阅）。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">若您已经注册为本网站用户，即表示您已充分阅读、理解并同意自己与本网站订立本协议，且您自愿受本协议的条款约束。本网站有权随时变更本协议并在本网站上予以公告。经修订的条款一经在本网站的公布后，立即自动生效。如您不同意相关变更，必须停止使用本网站。本协议内容包括协议正文及部分上海金尚设计工坊已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用本网站，则表示您已接受并自愿遵守经修订后的条款。</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第一条</span> <span style="font-family:微软雅黑">用户资格</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、只有符合下列条件之一的自然人或法人才能申请成为本网站用户，可以使用本网站的服务：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、年满十八岁，并具有民事权利能力和民事行为能力的自然人；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、无民事行为能力人或限制民事行为能力人应经过其监护人的同意；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、根据中国法律、法规、行政规章成立并合法存在的机关、企事业单位、社团组织和其他组织。无法人资格的单位或组织不当注册为本网站用户的，其与本网站之间的协议自始无效，本网站一经发现，有权立即终止对该用户的服务，并追究其使用本网站服务的一切法律责任。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、用户需要提供明确的联系地址和联系电话。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、本网站用户须承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第二条</span> <span style="font-family:微软雅黑">用户的权利和义务　</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、用户有权根据本协议及本网站发布的相关规则，利用本网站发布需求修图信息、参与需求发单或接单，发布服务信息，参加本网站的有关活动及有权享受本网站提供的其他有关资讯及信息服务；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、用户须自行负责自己的用户登陆账号和密码、支付密码，且须对在用户账号密码下发生的所有活动（包括但不限于发布需求信息、发布服务信息、网上点击同意各类协议、规则等）承担责任。用户有权根据需要更改登录和账户支付密码。因用户的过错导致的任何损失由用户自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，用户使用的计算机被他人侵入；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、用户应当向本网站提供真实准确的注册信息，包括但不限于真实姓名、身份证号、联系电话、地址等。保证本网站可以通过上述联系方式与自己进行联系。同时，用户也应当在相关资料实际变更时及时更新有关注册资料；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">4、 用户在本网站注册的账号名称和上传内容，不得有下列情形： &nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;（一）违反宪法或法律法规规定的； &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（三）损害国家荣誉和利益的，损害公共利益的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（四）煽动民族仇恨、民族歧视，破坏民族团结的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（五）破坏国家宗教政策，宣扬邪教和封建迷信的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（六）散布谣言，扰乱社会秩序，破坏社会稳定的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（七）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（八）侮辱或者诽谤他人，侵害他人合法权益的；</span> &nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（九）含有法律、行政法规禁止的其他内容的。</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">5、用户不得以虚假信息骗取账号名称注册，或其账号头像、简介等注册信息存在违法和不良信息；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">6、用户不得冒用、关联机构或社会名人注册账号名称；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">7、用户有义务确保在本网站上发布的需求信息真实、准确，无误导性；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">8、用户在本网站上发布需求和在服务信息，不得违反国家法律、法规、行政规章的规定、不得侵犯他人知识产权或其他合法权益的信息、不得违背社会公共利益或公共道德、不得违反上海金尚设计工坊的相关规定；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">9、用户在本网站交易中应当遵守诚实信用原则，不得以干预或操纵发布需求等不正当竞争方式扰乱网上交易秩序，不得从事与网上交易无关的不当行为；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">10、用户不应采取不正当手段（包括但不限于虚假需求、互换好评等方式）提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户信用度；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">11、用户承诺自己在使用本网站实施的所有行为遵守法律、法规、行政规章和本网站的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，用户将以自己的名义独立承担相应的法律责任；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">12、用户在本网站网上交易过程中如与其他用户因交易产生纠纷，可以请求本网站从中予以协调处理。用户如发现其他用户有违法或违反本协议的行为，可以向本网站举报；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">13、除上海金尚设计工坊另有规定外，用户应当自行承担因交易产生的相关费用，并依法纳税；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">14、未经本网站书面允许，用户不得将本网站的任何资料以及在交易平台上所展示的任何信息作商业性利用（包括但不限于以复制、修改、翻译等形式制作衍生作品、分发或公开展示）；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">15、用户不得使用以下方式登录网站或破坏网站所提供的服务：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、以任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件或其它自动方式访问或登录本网站；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、通过任何方式对本公司内部结构造成或可能造成不合理或不合比例的重大负荷的行为；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、通过任何方式干扰或试图干扰网站的正常工作或网站上进行的任何活动。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">16、用户同意接收来自本网站的信息，包括但不限于活动信息、交易信息、促销信息等。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">17、用户注册即同意交易时资金托管到上海金尚设计工坊账号，并在上海金尚设计工坊平台“余额”中管理资金。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第三条</span> <span style="font-family:微软雅黑">上海金尚设计工坊平台的权利和义务　　</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、本网站仅为用户提供一个信息交流平台，是影楼发布需求和数码服务商提供解决方案的一个交易市场；</span></p><p style="margin-left:48px"><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、本网站有义务在现有技术水平的基础上努力确保整个网上交流平台的正常运行，尽力避免服务中断或将中断时间限制在最短时间内，保证用户网上交流活动的顺利进行；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、本网站有义务对用户在注册使用本网站信息平台中所遇到的与交易或注册有关的问题及反映的情况及时作出回复；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">4、本网站有权对用户的注册资料进行审查，对存在任何问题或怀疑的注册资料，本网站有权发出通知询问用户并要求用户做出解释、改正；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">5、用户因在本网站网上交易与其他用户产生纠纷的，用户将纠纷告知本网站，或本网站知悉纠纷情况的，经审核后，本网站有权通过电子邮件及电话联系向纠纷双方了解纠纷情况，并将所了解的情况通过电子邮件互相通知对方；用户通过司法机关依照法定程序要求本网站提供相关资料，本网站将积极配合并提供有关资料；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">6、因网上信息平台的特殊性，本网站不承担对所有用户的交易行为以及与交易有关的其他事项进行事先审查的义务，但如发生以下情形，本网站有权无需征得用户的同意限制用户的活动、向用户核实有关资料、发出警告通知、暂时中止、无限期中止及拒绝向该用户提供服务：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、用户以非自然人名义进行认证之后认证主体自行注销或者经有权机关吊销或撤销的；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、用户违反本协议或因被提及而纳入本协议的相关规则；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据，而本网站无法联系到该用户核证或验证该用户向本网站提供的任何资料；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">D、存在用户或其他第三方通知本网站，认为某个用户或具体交易事项存在违法或不当行为，并提供相关证据。本网站以普通非专业人员的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为可能对他方或本网站造成财务损失或承担法律责任；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">7、根据国家法律、法规、行政规章规定、本协议的内容和本网站所掌握的事实依据，可以认定该用户存在违法或违反本协议行为以及在本网站交易平台上的其他不当行为，本网站有权无需征得用户的同意在本网站交易平台及所在网站上以网络发布形式公布该用户的违法行为，并有权随时作出删除相关信息、终止服务提供等处理；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">8、本网站依据本协议及相关规则，可以冻结、使用、先行赔付、退款、处置用户缴存并冻结在本网站账户内的资金。因违规而被封号的用户账户中的资金在按照规定进行处置后尚有余额的，该用户可申请提现；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">9、本网站有权在不通知用户的前提下，删除或采取其他限制性措施处理下列信息：包括但不限于以规避费用为目的；以炒作信用为目的；存在欺诈等恶意或虚假内容；与网上交易无关或不是以交易为目的；存在恶意竞价或其他试图扰乱正常交易秩序因素；违反公共利益或可能严重损害本网站和其他用户合法利益。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第四条</span> <span style="font-family:微软雅黑">服务的中断和终止　　</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、本网站可自行全权决定以任何理由(包括但不限于本网站认为用户已违反本协议及相关规则的字面意义和精神)终止对用户的服务，并有权在两年内保存用户在本网站的全部资料（包括但不限于用户信息、产品信息、交易信息等）。同时本网站可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供全部或部分服务。服务终止后，本网站没有义务为用户保留原账户中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给用户或第三方；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、若用户申请终止本网站服务，需经本网站审核同意，方可解除与本网站的协议关系，但本网站仍保留下列权利：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、本网站有权在法律、法规、行政规章规定的时间内保留该用户的资料,包括但不限于以前的用户资料、交易记录等；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、若终止服务之前，该用户在本网站交易平台上存在违法行为或违反本协议的行为，本网站仍可行使本协议所规定的权利。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、用户存在下列情况，本网站可以终止向该用户提供服务：　 　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、在用户违反本协议及相关规则规定时，本网站有权终止向该用户提供服务。本网站将在中断服务时通知用户。但该用户在被本网站终止提供服务后，再一次直接或间接或以他人名义注册为本网站用户的，本网站有权再次单方面终止为该用户提供服务；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、本网站发现用户注册资料中主要内容是虚假的，本网站有权随时终止为该用户提供服务；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、本协议终止或更新时，用户未确认新的协议的；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">D、其它本网站认为需终止服务的情况。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第五条</span> <span style="font-family:微软雅黑">本网站的责任范围</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">当用户接受该协议时，用户应当明确了解并同意：</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、本网站不能随时预见到任何技术上的问题或其他困难。该等困难可能会导致数据损失或其他服务中断。本网站是在现有技术基础上提供的服务。本网站不保证以下事项∶</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、本网站将符合所有用户的要求；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、本网站不受干扰、能够及时提供、安全可靠或免于出错；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、本服务使用权的取得结果是正确或可靠的。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、是否经由本网站下载或取得任何资料，由用户自行考虑、衡量并且自负风险，因下载任何资料而导致用户电脑系统的任何损坏或资料流失，用户应负完全责任。希望用户在使用本网站时，小心谨慎并运用常识；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、用户经由本网站取得的建议和资讯，无论其形式或表现，绝不构成本协议未明示规定的任何保证；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">4、基于以下原因而造成的利润、商誉、使用、资料损失或其它无形损失，本网站不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、本网站的使用或无法使用；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、用户的传输或资料遭到未获授权的存取或变更；　　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、本网站中任何第三方之声明或行为；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">D、本网站在服务交易中为用户提供交易机会，推荐交易方；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">E、本网站其它相关事宜。　 　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第六条</span> <span style="font-family:微软雅黑">隐私权</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、信息使用：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、本网站不会向任何人出售或出借用户的个人或法人信息，除非事先得到用户得许可；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、本网站亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播用户的个人或法人信息。任何用户如从事上述活动，一经发现，本网站有权立即终止与该用户的服务协议，查封其账号。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、信息披露：用户的个人或法人信息将在下述情况下部分或全部被披露：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、经用户同意，向第三方披露；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、用户在使用本网站过程中涉及到知识产权类纠纷，有他方主张权利的，本网站在审核主张方提交的资料后认为披露用户信息有助于纠纷解决的；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">C、根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">D、若用户出现违反中国有关法律或者网站规定的情况，需要向第三方披露；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">E、为提供你所要求的产品和服务，而必须和第三方分享用户的个人或法人信息；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">F、其它本网站根据法律或者网站规定认为合适的披露。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">3、信息安全：</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">A、在使用本网站服务进行网上交易时，请用户妥善保护自己的个人或法人信息，仅在必要的情形下向他人提供；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">B、如果用户发现自己的个人或法人信息泄密，尤其是用户账户密码或支付密码发生泄露，请用户立即联络本网站客服，以便我们采取相应措施。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第七条</span> <span style="font-family:微软雅黑">不可抗力</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">因</span> <span style="font-family:微软雅黑">不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本合同所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包括但不限于战争、台风、水灾、火灾、雷击或地震、罢工、暴动、法定疾病、黑客攻击、网络病毒、电信部门技术管制、政府行为或任何其它自然或人为造成的灾难等客观情况。</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第八条</span> <span style="font-family:微软雅黑">交易纠纷解决方式　　</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">1、本协议及其规则的有效性、履行和与本协议及其规则效力有关的所有事宜，将受中华人民共和国法律管辖，任何争议仅适用中华人民共和国法律；　</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">2、本网站有权受理并调处您与数码师因交易服务产生的纠纷，同时有权单方面独立判断数码师对您的举报及索偿是否成立，若判断索偿成立，则本网站有权划拨您已支付的担保金或交纳的保证金以及账户余额进行相应偿付。本网站没有使用自用资金进行偿付的义务，但若进行了该等支付，您应及时赔偿本网站的全部损失，否则本网站有权通过前述方式抵减相应资金或权益，如仍无法弥补损失，则本网站保留继续追偿的权利。因本网站非司法机关，您完全理解并承认，本网站对证据的鉴别能力及对纠纷的处理能力有限，受理交易纠纷完全是基于您之委托，不保证处理结果符合您的期望；</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第九条</span> <span style="font-family:微软雅黑">完整协议</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">您对本协议理解和认同，您即对本协议所有组成部分的内容理解并认同，一旦您使用本服务，你和本公司即受本协议所有组成部分的约束。</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第十条</span> <span style="font-family:微软雅黑">上海金尚设计工坊对本服务协议包括基于本服务协议制定的各项规则拥有最终解释权。</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">第十三条</span> <span style="font-family:微软雅黑">附则</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">在本协议中所使用的下列词语，除非另有定义，应具有以下含义：</span></span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">“本网站”在无特别说明的情况下，均指"上海金尚设计工坊"</span></p><p><span style="font-family: 微软雅黑;font-size: 18px"><span style="font-family:微软雅黑">（</span>www.17xiutu.com）。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">“用户”：指具有完全民事行为能力的上海金尚设计工坊平台各项服务的使用者。</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;</span></p><p><span style="font-family: 微软雅黑;font-size: 18px">&nbsp;“服务商”：是指在本网站上参加竞标、销售服务、出售技能等“卖”操作的用户。</span></p><p><span style="font-family:Calibri;font-size:14px">&nbsp;</span></p><p>&#8203;<br></p></body>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import myHead from '../module/common/head.vue'
    import Lib from '../assets/lib.js'
    import qiniu from '../components/qiniu.vue'
    const qrCode = require('qrcode');
    export default {
        data: () => ({
            qnyUrl: Lib.C.qiniu.jsUrl,
            host: Lib.C.hostPhotoStudio,
            identity: {
                key: "identity",
                yasuobao: " "
            },
            btnCode: {
                send: true,
                stop: false,
                num: 60
            },
            register: {
                "sheji": false,
                "xiupian": false
            }
        }),
        events: {
            'child-qiniu-data' (obj) {
                var self = this;
                if (obj.key) {
                    self.$set("register.identity", obj.key);
                }
            }
        },
        watch: {
            "register.identity": function(val) {
                if (this.register.identity) {
                    $(".btn-default").css("opacity", 0.6)
                }
            }
        },
        created: function() {
            this.registerQrcode();
            sessionStorage.setItem("position", "gongzuoshi");
        },
        ready: function() {},
        methods: {
            registerQrcode() {
                var url = this.host + 'v1/wx/RegisterQrcode',
                    self = this,
                    postParam = {};
                postParam = {
                    "type": "work"
                };
                Lib.M.load(url, postParam, function(data) {
                    console.log(data);
                    data.id = JSON.stringify(data.id);
                    self.register.id = data.id.slice(3, data.id.length);
                    var QC;
                    QC = qrCode.qrcode(5, 'L');
                    QC.addData(data.url);
                    QC.make();
                    const imgTag = QC.createImgTag(5);
                    $(".QR").html(imgTag);
                    self.getSocket(data.id);
                }, "get");
            },
            getSocket(id) {
                var self = this;
                var sockjsAddr = "118.178.236.192:8080" + "/scoket/join/" + "reg" + id;
                var sockjsClient;
                var onopen = function() {
                    console.log('open')
                };
                var onmessage = function(e) {
                    console.log(e)
                    var data = JSON.parse(e.data);
                    Lib.M.topRightInfoTips({
                        title: data.messsge
                    });
                    self.$set("register.nickName", data.nickName);
                    self.$set("register.logo", data.headImage);
                    if (data.id) {
                        self.$set("register.idTwo", data.id);
                    }
                };
                var onclose = function() {
                    console.log('close');
                    this.getSocketNum++;
                    if (this.getSocketNum < 10) {
                        this.getSocket();
                    }
                };
                sockjsClient = new WebSocket('ws:' + sockjsAddr);
                sockjsClient.onopen = onopen;
                sockjsClient.onmessage = onmessage;
                sockjsClient.onclose = onclose;
            },
            getCode: function() {
                var url = this.host + 'v1/sendMessage',
                    self = this,
                    postParam = {};
                if (!this.register.account || this.register.account.length != 11) {
                    Lib.M.topRightInfoTips({
                        title: "请填写正确手机号码"
                    });
                    return false;
                }
                postParam = {
                    "phone": this.register.account,
                    "signName": "注册验证",
                    "title": "用户注册验证码"
                };
                Lib.M.load(url, postParam, function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code && data.code == -1) {
                        self.btnCode.send = false;
                        self.btnCode.stop = true;
                        var n = 60,
                            timer;
                        timer = setInterval(function() {
                            n--;
                            self.$set("btnCode.num", n)
                            if (n <= 0) {
                                clearInterval(timer);
                                self.btnCode.send = true;
                                self.btnCode.stop = false;
                            }
                        }, 1000);
                    }
                }, "get");
            },
            verificat() {
                if (!this.register.name) {
                    Lib.M.topRightInfoTips({
                        title: "请填写工作室名称"
                    });
                    return false;
                } else if (!this.register.nickName) {
                    Lib.M.topRightInfoTips({
                        title: "请填写工作室昵称"
                    });
                    return false;
                } else if (!this.register.account) {
                    Lib.M.topRightInfoTips({
                        title: "请填写手机号码"
                    });
                    return false;
                } else if (!this.register.password) {
                    Lib.M.topRightInfoTips({
                        title: "请填写您的密码"
                    });
                    return false;
                } else if (this.register.password != this.register.surePassword) {
                    Lib.M.topRightInfoTips({
                        title: "请输入两次一样的密码"
                    });
                    return false;
                } else if (!this.register.code) {
                    Lib.M.topRightInfoTips({
                        title: "请填写验证码"
                    });
                    return false;
                } else if (!this.register.xiupian && !this.register.sheji) {
                    Lib.M.topRightInfoTips({
                        title: "请选择营业范围"
                    });
                    return false;
                } else if (!this.register.logo) {
                    Lib.M.topRightInfoTips({
                        title: "请扫描二维码绑定微信账号"
                    });
                    return false;
                } else if (!this.register.identity) {
                    Lib.M.topRightInfoTips({
                        title: "请上传身份证"
                    });
                    return false;
                } else if (!this.register.agree) {
                    Lib.M.topRightInfoTips({
                        title: "请同意注册协议"
                    });
                    return false;
                }
                this.registers();
            },
            registers() {
                var url = this.host + 'v1/work/Register',
                    self = this,
                    postParam = {};
                postParam = {
                    "logo": this.register.logo,
                    "account": this.register.account,
                    "nickName": this.register.nickName,
                    "name": this.register.name,
                    "identity": this.register.identity,
                    "password": this.register.password,
                    "code": this.register.code,
                    "id": this.register.idTwo ? parseInt(this.register.idTwo) : parseInt(this.register.id)
                };
                if (this.register.sheji) {
                    postParam.business = "SJ";
                }
                if (this.register.xiupian) {
                    postParam.business = "XP";
                }
                if (this.register.sheji && this.register.xiupian) {
                    postParam.business = "ALL";
                }
                Lib.M.load(url, JSON.stringify(postParam), function(data) {
                    Lib.M.topRightInfoTips({
                        title: data.message
                    });
                    if (data.code && data.code == -1) {
                        location.href = "#/";
                    }
                });
            }
        },
        components: {
            qiniu,
            myHead
        }
    }
</script>
<style scoped>
    .weizhi {
        position: absolute;
        top: 290px;
        right: 20%;
    }
    
    .weizhi p {
        text-align: center;
        margin-top: 10px
    }
    
    .register {
        width: 100%;
        margin: 0 auto;
        background: #f1f2f9;
        min-height: 1100px;
    }
    
    .title {
        padding-top: 6%;
        margin-bottom: 20px;
    }
    
    .title h3,
    .title h4 {
        text-align: center;
    }
    
    .register form {
        position: relative;
        overflow: hidden;
        width: 65%;
        margin: 0 auto;
    }
    
    label {
        font-weight: normal;
    }
    
    .form-control {
        background: rgba(0, 0, 0, 0);
        border-radius: 0;
        height: 48px;
    }
    
    .checkbox-inline {
        padding-top: 16px !important;
    }
    
    .btn-primary,
    .btn-info {
        border-radius: 0;
        height: 35px;
        width: 100%;
        margin-top: 6px;
    }
    
    .sure {
        height: 50px;
    }
    
    .img-thumbnail {
        width: 100%;
        height: 246px;
        background-color: #f1f2f9;
    }
    
    .parQiniu {
        position: relative;
    }
    
    .qiniu {
        position: absolute;
        top: 21%;
        right: 17%;
    }
    
    .qiniu .btn-default {
        background-color: #eeeeee;
        border: 0;
        color: #ed9a0f;
    }
    
    .form-horizontal .control-label {
        margin-top: 7px;
    }
</style>