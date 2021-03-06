 /*
 * Tille: user.js; 
 * Function:完成用户注册、登录验证以及相关页面的跳转; 
 * @author shatong
 * Date:2016-12-30 13:37:20
 */

// 注册验证
$(function() {
			/*
			 * 思路大概是先为每一个required添加必填的标记，用each()方法来实现。
			 * 在each()方法中先是创建一个元素。然后通过append()方法将创建的元素加入到父元素后面。
			 * 这里面的this用的很精髓，每一次的this都对应着相应的input元素，然后获取相应的父元素。
			 * 然后为input元素添加失去焦点事件。然后进行用户名、邮件的验证。
			 * 这里用了一个判断is()，如果是用户名，做相应的处理，如果是邮件做相应的验证。
			 * 在jQuery框架中，也可以适当的穿插一写原汁原味的javascript代码。比如验证用户名中就有this.value，和this.value.length。对内容进行判断。
			 * 然后进行的是邮件的验证，貌似用到了正则表达式。
			 * 然后为input元素添加keyup事件与focus事件。就是在keyup时也要做一下验证，调用blur事件就行了。用triggerHandler()触发器，触发相应的事件。
			 * 最后提交表单时做统一验证 做好整体与细节的处理
			 */
			// 如果是必填的，则加红星标识.
			$("form :input.required").each(function() {
				var $required = $("<strong class='high'> *</strong>").css(
						"color", "red"); // 创建元素
				$(this).parent().append($required); // 然后将它追加到文档中
			});
			// 文本框失去焦点后
			$('form :input').blur(function() {
				var $parent = $(this).parent();
				$parent.find(".formtips").remove();
				// 验证用户名
				if ($(this).is('#username')) {
					if (this.value == "" || this.value.length < 6) {
						var errorMsg = '请输入至少6位的用户名';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					} else {
						var okMsg = '输入正确.';
						$parent.append('<span class="formtips onSuccess">'
								+ okMsg + '</span>');
					}
				}
				// 验证密码
				if ($(this).is('#password')) {
					if (this.value == "" || this.value.length < 6) {
						var errorMsg = '请输入至少6位的密码';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					} else {
						var okMsg = '输入正确！';
						$parent.append('<span class="formtips onSuccess">'
								+ okMsg + '</span>');
					}
				}
				/*
				 * // 验证真名 if ($(this).is('#realname')) { if (this.value == "") {
				 * var errorMsg = '请输入真名'; $parent.append('<span
				 * class="formtips onError">' + errorMsg + '</span>'); } else {
				 * var okMsg = '输入正确！'; $parent.append('<span class="formtips
				 * onSuccess">' + okMsg + '</span>'); } }
				 */
				// 验证电话
				if ($(this).is('#telephone')) {
					if (this.value == "" || this.value != ""
							&& !/^1(3|5|7|8|9)\d{9}$/.test(this.value)) {
						var errorMsg = '请输入11位正确号码';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					} else {
						var okMsg = '输入正确！';
						$parent.append('<span class="formtips onSuccess">'
								+ okMsg + '</span>');
					}
				}
				// 验证邮件
				if ($(this).is('#email')) {
					if (this.value == ""
							|| (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/
									.test(this.value))) {
						var errorMsg = '请输入正确的E-Mail地址';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					} else {
						var okMsg = '输入正确！';
						$parent.append('<span class="formtips onSuccess">'
								+ okMsg + '</span>');
					}
				}
					// 验证地址
					/*
					 * if ($(this).is('#homeaddress')) { if (this.value == "" ||
					 * (this.value != "" &&
					 * !/^[\u4E00-\u9FA5A-Za-z\d\-\_]{5,60}$/
					 * .test(this.value))) { var errorMsg = '请输入正确的地址';
					 * $parent.append('<span class="formtips onError">' +
					 * errorMsg + '</span>'); } else { var okMsg = '输入正确！';
					 * $parent.append('<span class="formtips onSuccess">' +
					 * okMsg + '</span>'); } }
					 */
			}).keyup(function() {
						$(this).triggerHandler("blur");
					}).focus(function() {
						$(this).triggerHandler("blur");
					});// end blur

			// 提交，最终验证。
			$('#send').click(function() {
						$("form :input.required").trigger('blur');
						var numError = $('form .onError').length;
						if (numError) {
							return false;
						}
						alert("恭喜你，注册成功!");
					});

			// 重置
			$('#res').click(function() {
						
						$(".formtips").remove();
					});
		})

// 验证码
$(document).ready(function() {
			$("#code").click(function() {
						changeImg();
					})
		})
function changeImg() {
	// 验证码组成库
	var arrays = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	// 重新初始化验证码
	code = '';
	// 随机从数组中获取四个元素组成验证码
	for (var i = 0; i < 4; i++) {
		// 随机获取一个数组的下标
		var r = parseInt(Math.random() * arrays.length);
		code += arrays[r];
	}
	// 验证码写入span区域
	document.getElementById('code').innerHTML = code;

}

// 验证验证码
function check() {
	var error;
	var pass;
	// 获取用户输入的验证码
	var codeInput = document.getElementById('codeInput').value;
	if (codeInput.toLowerCase() == code.toLowerCase()) {
		// console.log('123');
		pass = '验证通过！';
		document.getElementById('errorTips').innerHTML = pass;
		return true;
	} else {
		error = '验证码错误，重新输入';
		document.getElementById('errorTips').innerHTML = error;
		return false;
	}
}

// 页面返回

$(document).ready(function() {
	$("#sbm").click(function() {//提交修改确认
				if (confirm("你确定要修改吗？")) {
					location.href = "/jquery-validateLogin/pages/updateSuccess.jsp";
					return true;
				} else {
					return false;
				}

			});
	$("#goback").click(function() {// 返回前一页
				self.location = document.referrer;
			});
	
	$("#register").click(function() {//注册页面跳转
				location.href = "/jquery-validateLogin/pages/register.jsp";
			})
	$("#container").PageSwitch({// 图片轮播
		direction : 'horizontal',
		easing : 'ease-in',
		duration : 1000,
		autoPlay : true,
		loop : 'true'
	});
});
