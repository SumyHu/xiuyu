//存储全局变量
var commentValue = {
	hadFinishValue: 20
};

//需初始化的事件
var init = function() {
	articleTopInit();
	bindEvent();
};

//左侧导航栏事件处理
var asideBlockEvent = {
	//被选中导航栏样式效果
	selectedStyle: function(target) {
		$(".aside-nav ul li").removeClass();
		target.addClass("aside-nav-selected");
	},

	//显示被选中块的内容
	showMainBlock: function(index) {
		$(".main-block").css("display", "none");
		$(".main-block")[index].style.display = "block";
	}
};

//绑定左侧导航栏事件
var bindAsideNavEvent = function() {
	$.each($(".aside-nav ul li"), function(index, liTarget) {
		$(liTarget).on("click", function() {
			asideBlockEvent.selectedStyle($(this));
			asideBlockEvent.showMainBlock(index);
		});
	});
};

//article的top部分的事件处理
var articleTopEvent = {
	//获取当前时间
	getCurrentDate: function() {
		return new Date().toLocaleString();
	},

	//实时更新当前时间
	setDateEvent: function() {
		var currentDate = articleTopEvent.getCurrentDate();
		$(".date").text(currentDate);
		setTimeout(articleTopEvent.setDateEvent, 1000);
	},

	//设置my-case里面的进度值
	setMyCaseSpanValue: function() {
		var str = commentValue.hadFinishValue + "%";
		$(".my-case span").text(str);
	},

	//设置进度条
	setProcessBar: function() {
		$(".progress-bar").attr("aria-valuenow", commentValue.hadFinishValue);
		$(".progress-bar").css("width", commentValue.hadFinishValue+"%");
		$(".progress-bar").text(commentValue.hadFinishValue+"%");
	}
};

//公告管理逻辑处理
var callBoardEvent = {
	//点击公告栏查看情况的样式处理
	selectedStyle: function(target) {
		$(".aside-block nav a").removeClass();
		target.addClass("aside-block-selected");
	},

	//点击公告栏查看情况显示情况
	showCallBoardTitle: function(className) {
		$(".call-board-title").css("display", "none");
		$("." + className).css("display", "block");
	},

	//点击公告标题后公告标题处理
	hadClickTitleStyle: function(target) {
		$(".call-board-title a").css("color", "#595757");
		target.css("color", "red");

		if (target.parent().attr("class") === "call-board-title not-see") {
			target.parent().attr("class", "call-board-title already-see")
		}

		$(".article").css("display", "none");
		var className = target.attr("class");
		$("." + className + "-article").css("display", "block");
	},

	//点击收藏或者删除
	clickStarOrRemove: function(target) {
		target.popover("show");
	}
};

//公告管理事件绑定
var bindCallBoardEvent = function() {
	$.each($(".aside-block nav a"), function(index, aTarget) {
		$(aTarget).on("click", function() {
			callBoardEvent.selectedStyle($(this));

			if ($(aTarget).text() === "未看公告") {
				callBoardEvent.showCallBoardTitle("not-see");
			}
			else if ($(aTarget).text() === "已看公告") {
				callBoardEvent.showCallBoardTitle("already-see");
			}
			else {
				$(".call-board-title").css("display", "block");
			}
		});
	});

	$.each($(".call-board-title a"), function(index, titleTarget) {
		$(titleTarget).on("click", function() {
			callBoardEvent.hadClickTitleStyle($(this));
		});
	});

	$.each($(".star"), function(index, starTarget) {
		$(starTarget).on("click", function() {
			callBoardEvent.clickStarOrRemove($(this));
		});
	});

	$.each($(".remove"), function(index, removeTarget) {
		$(removeTarget).on("click", function() {
			callBoardEvent.clickStarOrRemove($(this));
		});
	});
};

//article的top部分的需要初始化的事件
var articleTopInit = function() {
	articleTopEvent.setDateEvent();
	articleTopEvent.setMyCaseSpanValue();
	articleTopEvent.setProcessBar();
};

//全局事件绑定
var bindEvent = function() {
	bindCallBoardEvent();
	bindAsideNavEvent();
};

$(function() {
	init();
});