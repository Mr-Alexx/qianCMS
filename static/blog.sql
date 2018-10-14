/*
 Navicat Premium Data Transfer

 Source Server         : 3306
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 14/10/2018 23:39:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '用户id',
  `title` varchar(30) NOT NULL DEFAULT '' COMMENT '文章中文title',
  `category_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属栏目id',
  `category_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `source` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源 原创/参考/转载',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示 0 隐藏 1显示',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '缩略图 路径',
  `summary` varchar(255) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新/修改时间',
  `is_delete` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否禁用: 0删除 1正常',
  `views` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '访问数',
  `comments` int(5) unsigned NOT NULL DEFAULT '0' COMMENT '评论数量',
  `likes` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点赞数',
  `html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章主题内容',
  `markdown` longtext NOT NULL COMMENT '存储markdown内容',
  `smtitle` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '标签json',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`,`is_delete`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (30, 1, '测试测试fff', 6, '音乐', '原创', 0, 'https://www.html-js.cn/upload/images/img20180828223116.png', '测试测试测试', '2018-10-12 17:44:51', '2018-10-12 17:44:51', 1, 100, 23, 0, '<h1 id=\"h1-test\"><a name=\"test\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>test</h1><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;</span><span class=\"pln\">template</span><span class=\"pun\">&gt;</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"pun\">&lt;</span><span class=\"pln\">div id</span><span class=\"pun\">=</span><span class=\"str\">\"app\"</span><span class=\"pln\"> </span><span class=\"kwd\">class</span><span class=\"pun\">=</span><span class=\"str\">\"test\"</span><span class=\"pun\">&gt;{{</span><span class=\"pln\">msg</span><span class=\"pun\">}}&lt;/</span><span class=\"pln\">div</span><span class=\"pun\">&gt;</span></code></li><li class=\"L2\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;/</span><span class=\"pln\">template</span><span class=\"pun\">&gt;</span></code></li><li class=\"L3\"><code class=\"lang-javascript\"></code></li><li class=\"L4\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;</span><span class=\"pln\">script</span><span class=\"pun\">&gt;</span></code></li><li class=\"L5\"><code class=\"lang-javascript\"><span class=\"pln\">    let app </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"kwd\">new</span><span class=\"pln\"> </span><span class=\"typ\">Vue</span><span class=\"pun\">({</span></code></li><li class=\"L6\"><code class=\"lang-javascript\"><span class=\"pln\">        el</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"str\">\'#app\'</span><span class=\"pun\">,</span></code></li><li class=\"L7\"><code class=\"lang-javascript\"><span class=\"pln\">        data </span><span class=\"pun\">()</span><span class=\"pln\"> </span><span class=\"pun\">{</span></code></li><li class=\"L8\"><code class=\"lang-javascript\"><span class=\"pln\">            </span><span class=\"kwd\">return</span><span class=\"pln\"> </span><span class=\"pun\">{</span></code></li><li class=\"L9\"><code class=\"lang-javascript\"><span class=\"pln\">                msg</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"str\">\'test\'</span></code></li><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"pln\">            </span><span class=\"pun\">}</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"pln\">        </span><span class=\"pun\">}</span></code></li><li class=\"L2\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"pun\">})</span></code></li><li class=\"L3\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;/</span><span class=\"pln\">script</span><span class=\"pun\">&gt;</span></code></li><li class=\"L4\"><code class=\"lang-javascript\"></code></li><li class=\"L5\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;</span><span class=\"pln\">style lang</span><span class=\"pun\">=</span><span class=\"str\">\"scss\"</span><span class=\"pun\">&gt;</span></code></li><li class=\"L6\"><code class=\"lang-javascript\"><span class=\"pln\">    $color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"pun\">#</span><span class=\"pln\">fff</span><span class=\"pun\">;</span></code></li><li class=\"L7\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"pun\">.</span><span class=\"pln\">test</span><span class=\"pun\">{</span></code></li><li class=\"L8\"><code class=\"lang-javascript\"><span class=\"pln\">        color</span><span class=\"pun\">:</span><span class=\"pln\"> $color</span><span class=\"pun\">;</span></code></li><li class=\"L9\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"pun\">}</span></code></li><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"pun\">&lt;/</span><span class=\"pln\">style</span><span class=\"pun\">&gt;</span></code></li></ol></pre>\n<h1 id=\"h1-fff\"><a name=\"fff\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>fff</h1><h1 id=\"h1-test\"><a name=\"test\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>test</h1>', '#test\n```javascript\n<template>\n	<div id=\"app\" class=\"test\">{{msg}}</div>\n</template>\n\n<script>\n	let app = new Vue({\n		el: \'#app\',\n		data () {\n			return {\n				msg: \'test\'\n			}\n		}\n	})\n</script>\n\n<style lang=\"scss\">\n	$color: #fff;\n	.test{\n		color: $color;\n	}\n</style>\n```\n#fff\n#test', '测试', '[{\"id\":2,\"tname\":\"vue\"}]');
INSERT INTO `article` VALUES (43, 1, 'test', 8, 'css', '原创', 1, '', 'adfdsaf', '2018-09-20 03:15:49', '2018-09-20 03:15:49', 1, 20, 3, 0, '<p>adfdasfda</p>\n', 'adfdasfda', 'dasfads', '[{\"id\":1,\"tname\":\"js\"}]');
INSERT INTO `article` VALUES (44, 1, 'adfdasf', 44, '其它', '原创', 1, 'https://www.html-js.cn/upload/images/img20180415005551.jpg', 'adsfdasf', '2018-10-12 17:45:08', '2018-10-12 17:45:08', 1, 10, 5, 0, '<p>adfdasfa</p>\n', 'adfdasfa', 'adfdas', '[{\"id\":2,\"tname\":\"vue\"},{\"id\":3,\"tname\":\"node\"}]');
INSERT INTO `article` VALUES (45, 1, 'adsfa', 17, 'vuex', '原创', 1, 'https://www.html-js.cn/upload/images/img20180415212519.jpeg', 'adsfads', '2018-10-12 17:45:27', '2018-10-12 17:45:27', 1, 13, 6, 0, '<p>adfadsfasfa</p>\n', 'adfadsfasfa', 'dsfad', '[{\"id\":2,\"tname\":\"vue\"},{\"id\":3,\"tname\":\"node\"}]');
INSERT INTO `article` VALUES (46, 1, 'adfdas', 16, 'vue-router', '转载', 0, '', 'dfadsfa', '2018-09-20 03:14:36', '2018-09-20 03:14:36', 1, 33, 7, 0, '<p>adfdasf</p>\n', 'adfdasf', 'adfadsf', '[{\"id\":2,\"tname\":\"vue\"},{\"id\":3,\"tname\":\"node\"}]');
INSERT INTO `article` VALUES (47, 1, 'adsfads', 11, 'express', '转载', 1, 'https://cdn.html-js.cn/upload/images/img20171231152208.png', 'dsfasdf', '2018-10-12 17:45:46', '2018-10-12 17:45:46', 1, 44, 0, 0, '<p>adfadsf</p>\n', 'adfadsf', 'dasfads', '[{\"id\":2,\"tname\":\"vue\"}]');
INSERT INTO `article` VALUES (48, 1, 'adsfadsf', 10, 'koa', '转载', 0, 'https://cdn.html-js.cn/upload/images/img20171129135227.jpg', 'sadfasdf', '2018-10-12 17:46:01', '2018-10-12 17:46:01', 1, 55, 85, 0, '<p>adsfasdfasf</p>\n', 'adsfasdfasf', 'adsfadsf', '[{\"id\":2,\"tname\":\"vue\"}]');
INSERT INTO `article` VALUES (51, 1, 'test', 6, '音乐', '原创', 1, '', 'setst', '2018-09-21 02:02:20', '2018-09-21 02:02:20', 1, 0, 0, 0, '<p>estststest</p>\n', 'estststest', 'tset', '[{\"id\":1,\"name\":\"js\",\"create_time\":\"2018-09-20T08:21:20.000Z\",\"update_time\":\"2018-09-20T08:21:20.000Z\"}]');
INSERT INTO `article` VALUES (54, 1, 'Setup VPN 使用方法', 49, '其它', '原创', 1, 'https://www.html-js.cn/upload/smallimgs/img20160413171705.png', 'Setup VPN 使用方法', '2018-10-12 17:46:34', '2018-10-12 17:46:34', 1, 0, 0, 0, '<h1 id=\"h1--tw-1f1e8-1f1f3-\"><a name=\":tw-1f1e8-1f1f3:\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span><img src=\"http://twemoji.maxcdn.com/36x36/1f1e8-1f1f3.png\" title=\"twemoji-1f1e8-1f1f3\" alt=\"twemoji-1f1e8-1f1f3\" class=\"emoji twemoji\"></h1><h3 id=\"h3-setup-vpn-\"><a name=\"setup vpn下载\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>setup vpn下载</h3><p><a href=\"https://node2.173app.com/chrome/ext/oofgbpoabipfcfjapgnbbjjaenockbdp?name=SetupVPN  - 终身免费VPN「SetupVPN - Lifetime Free VPN」&amp;prodversion=69.0.3497.100http://\" title=\"setup vpn下载链接\">setup vpn下载链接</a></p>\n<h3 id=\"h3-u8FDBu5165u62D3u5C55u7A0Bu5E8Fu9875\"><a name=\"进入拓展程序页\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>进入拓展程序页</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabcb79f237.png\"><img src=\"https://i.loli.net/2018/10/08/5bbabcb79f237.png\" alt=\"\"></a></p>\n<h3 id=\"h3--vpn-\"><a name=\"将下载的vpn拖进拓展页内\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>将下载的vpn拖进拓展页内</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabd7a7d288.png\"><img src=\"https://i.loli.net/2018/10/08/5bbabd7a7d288.png\" alt=\"\"></a></p>\n<h3 id=\"h3-u5B89u88C5u5B8Cu540Eu4F1Au51FAu73B0u4E0Bu56FEu4E24u4E2Au4E1Cu897F\"><a name=\"安装完后会出现下图两个东西\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>安装完后会出现下图两个东西</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabe2db9f2f.png\"><img src=\"https://i.loli.net/2018/10/08/5bbabe2db9f2f.png\" alt=\"\"></a></p>\n<h3 id=\"h3--\"><a name=\"点击右上角小图标,选择汉语\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>点击右上角小图标,选择汉语</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabed0e1e46.png\"><img src=\"https://i.loli.net/2018/10/08/5bbabed0e1e46.png\" alt=\"\"></a></p>\n<h3 id=\"h3-u6CE8u518Cu8D26u6237\"><a name=\"注册账户\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>注册账户</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabed0e39a8.png\">https://i.loli.net/2018/10/08/5bbabed0e39a8.png</a></p>\n<h3 id=\"h3--\"><a name=\"填写信息—密码会在点击注册后发送到你的邮箱里,注意查看\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>填写信息—密码会在点击注册后发送到你的邮箱里,注意查看</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbabed0e5739.png\"><img src=\"https://i.loli.net/2018/10/08/5bbabed0e5739.png\" alt=\"\"></a></p>\n<h3 id=\"h3--vpn-twitter-\"><a name=\"再次点击小图标,登录vpn,选择你需要的节点,这里我想看twitter,所以选择美国节点\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>再次点击小图标,登录vpn,选择你需要的节点,这里我想看twitter,所以选择美国节点</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbac01c573e2.png\"><img src=\"https://i.loli.net/2018/10/08/5bbac01c573e2.png\" alt=\"\"></a></p>\n<h3 id=\"h3--vpn-\"><a name=\"等待连接vpn,完成后会有以下提示\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>等待连接vpn,完成后会有以下提示</h3><p><a href=\"https://i.loli.net/2018/10/08/5bbac08175458.png\"><img src=\"https://i.loli.net/2018/10/08/5bbac08175458.png\" alt=\"\"></a></p>\n<h3 id=\"h3--a-a-\"><a name=\"成功后就可以愉快翻墙了…<a></a>\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>成功后就可以愉快翻墙了…<a href=\"https://i.loli.net/2018/10/08/5bbac08257fa6.png\"><img src=\"https://i.loli.net/2018/10/08/5bbac08257fa6.png\" alt=\"\"></a></h3>', '#:tw-1f1e8-1f1f3:\n### setup vpn下载\n[setup vpn下载链接](https://node2.173app.com/chrome/ext/oofgbpoabipfcfjapgnbbjjaenockbdp?name=SetupVPN  - 终身免费VPN「SetupVPN - Lifetime Free VPN」&prodversion=69.0.3497.100http:// \"setup vpn下载链接\")\n###进入拓展程序页\n[![](https://i.loli.net/2018/10/08/5bbabcb79f237.png)](https://i.loli.net/2018/10/08/5bbabcb79f237.png)\n###将下载的vpn拖进拓展页内\n[![](https://i.loli.net/2018/10/08/5bbabd7a7d288.png)](https://i.loli.net/2018/10/08/5bbabd7a7d288.png)\n###安装完后会出现下图两个东西\n[![](https://i.loli.net/2018/10/08/5bbabe2db9f2f.png)](https://i.loli.net/2018/10/08/5bbabe2db9f2f.png)\n###点击右上角小图标,选择汉语\n[![](https://i.loli.net/2018/10/08/5bbabed0e1e46.png)](https://i.loli.net/2018/10/08/5bbabed0e1e46.png)\n###注册账户\nhttps://i.loli.net/2018/10/08/5bbabed0e39a8.png\n###填写信息--密码会在点击注册后发送到你的邮箱里,注意查看\n[![](https://i.loli.net/2018/10/08/5bbabed0e5739.png)](https://i.loli.net/2018/10/08/5bbabed0e5739.png)\n###再次点击小图标,登录vpn,选择你需要的节点,这里我想看twitter,所以选择美国节点\n[![](https://i.loli.net/2018/10/08/5bbac01c573e2.png)](https://i.loli.net/2018/10/08/5bbac01c573e2.png)\n###等待连接vpn,完成后会有以下提示\n[![](https://i.loli.net/2018/10/08/5bbac08175458.png)](https://i.loli.net/2018/10/08/5bbac08175458.png)\n###成功后就可以愉快翻墙了...[![](https://i.loli.net/2018/10/08/5bbac08257fa6.png)](https://i.loli.net/2018/10/08/5bbac08257fa6.png)', 'Setup VPN 使用方法', '[{\"id\":20,\"name\":\"vpn\",\"create_time\":\"2018-10-08T09:54:52.000Z\",\"update_time\":\"2018-10-08T09:54:52.000Z\"}]');
INSERT INTO `article` VALUES (55, 1, '锚点测试', 49, '其它', '原创', 1, 'https://www.html-js.cn/upload/smallimgs/img20160224123902.jpg', '锚点测试!', '2018-10-12 17:46:48', '2018-10-12 17:46:48', 1, 0, 0, 0, '<div class=\"editormd-toc-menu\"><div class=\"markdown-toc editormd-markdown-toc\"><ul class=\"markdown-toc-list\"><li><h1>目录 <i class=\"fa fa-angle-down\"></i></h1></li><li><a class=\"toc-level-1\" href=\"#标题1\" level=\"1\">标题1</a><ul><li><a class=\"toc-level-2\" href=\"#标题1-1\" level=\"2\">标题1-1</a></li><li><a class=\"toc-level-2\" href=\"#标题1-2\" level=\"2\">标题1-2</a></li></ul></li><li><a class=\"toc-level-1\" href=\"#标题2\" level=\"1\">标题2</a><ul><li><a class=\"toc-level-2\" href=\"#标题2-2\" level=\"2\">标题2-2</a><ul></ul></li></ul></li></ul><a href=\"javascript:;\" class=\"toc-menu-btn\"><i class=\"fa fa-angle-down\"></i>目录</a></div></div><br><h1 id=\"h1--1\"><a name=\"标题1\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>标题1</h1><h2 id=\"h2--1-1\"><a name=\"标题1-1\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>标题1-1</h2><h2 id=\"h2--1-2\"><a name=\"标题1-2\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>标题1-2</h2><h1 id=\"h1--2\"><a name=\"标题2\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>标题2</h1><h2 id=\"h2--2-2\"><a name=\"标题2-2\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>标题2-2</h2><p><code>npm install</code></p>\n', '[TOCM]\n\n#标题1\n##标题1-1\n##标题1-2\n\n#标题2\n##标题2-2\n`npm install`', '锚点测试', '[{\"id\":18,\"name\":\"wtff\",\"create_time\":\"2018-09-21T07:49:33.000Z\",\"update_time\":\"2018-09-21T07:49:33.000Z\"}]');
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '用户id',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '栏目名称',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '自栏目所属父栏目id',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '栏目排序 0为最底端',
  `url` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '栏目中文名称',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '服务端渲染 meta 关键词描述',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '服务端渲染 meta 描述详细信息',
  `allow_publish` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否发布',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '访问数',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 1, 'js', 4, 1, 'js', 'js 测试', 'js', 1, 1, 0, '2018-09-19 06:19:09', '2018-09-19 06:19:09');
INSERT INTO `category` VALUES (2, 1, 'vue', 4, 2, 'vue', '', '', 1, 1, 0, '2018-09-17 14:39:36', '2018-09-17 14:39:36');
INSERT INTO `category` VALUES (3, 1, 'node', 5, 1, 'node', '', '', 1, 1, 0, '2018-09-19 02:29:04', '2018-09-19 02:29:04');
INSERT INTO `category` VALUES (4, 1, '前端', 0, 1, 'frondend', '前端', '前端', 1, 1, 0, '2018-09-19 06:09:03', '2018-09-19 06:09:03');
INSERT INTO `category` VALUES (5, 1, '后端', 0, 2, 'backend', '', '', 1, 1, 0, '2018-09-17 14:39:57', '2018-09-17 14:39:57');
INSERT INTO `category` VALUES (6, 1, '音乐', 0, 3, 'music', '', '', 1, 1, 0, '2018-09-17 14:39:59', '2018-09-17 14:39:59');
INSERT INTO `category` VALUES (7, 1, '生活', 0, 4, 'life', '', '', 1, 1, 0, '2018-09-19 02:47:46', '2018-09-19 02:47:46');
INSERT INTO `category` VALUES (8, 1, 'css', 4, 4, 'css', '', '', 1, 1, 0, '2018-09-17 14:40:03', '2018-09-17 14:40:03');
INSERT INTO `category` VALUES (9, 1, 'html', 4, 3, 'html', '', '', 1, 1, 0, '2018-09-17 14:40:05', '2018-09-17 14:40:05');
INSERT INTO `category` VALUES (10, 1, 'koa', 3, 2, 'koa', '', '', 1, 1, 0, '2018-09-17 14:40:06', '2018-09-17 14:40:06');
INSERT INTO `category` VALUES (11, 1, 'express', 3, 3, 'express', '', '', 1, 1, 0, '2018-09-17 14:40:11', '2018-09-17 14:40:11');
INSERT INTO `category` VALUES (12, 1, 'react', 4, 2, 'react', '', '', 1, 1, 0, '2018-09-19 06:09:09', '2018-09-19 06:09:09');
INSERT INTO `category` VALUES (13, 1, 'jquery', 1, 0, 'jquery', '', '', 1, 1, 0, '2018-09-19 06:05:25', '2018-09-19 06:05:25');
INSERT INTO `category` VALUES (14, 1, 'zepto', 1, 1, 'zepto', '', '', 1, 1, 0, '2018-09-17 14:40:20', '2018-09-17 14:40:20');
INSERT INTO `category` VALUES (16, 1, 'vue-router', 2, 0, 'vue-router', '', '', 1, 1, 0, '2018-09-17 14:40:31', '2018-09-17 14:40:31');
INSERT INTO `category` VALUES (17, 1, 'vuex', 2, 0, 'vuex', '', '', 1, 1, 0, '2018-09-17 14:40:34', '2018-09-17 14:40:34');
INSERT INTO `category` VALUES (23, 1, 'hapi', 3, 3, 'hapi', 'hapi', 'hapi', 1, 1, 0, '2018-09-17 09:08:05', '2018-09-17 09:08:05');
INSERT INTO `category` VALUES (44, 1, '其它', 2, 0, 'others', '', '', 1, 1, 0, '2018-09-20 03:14:14', '2018-09-20 03:14:14');
INSERT INTO `category` VALUES (49, 1, '其它', 0, 0, 'others', '其它分类', '', 1, 1, 0, '2018-10-08 09:53:56', '2018-10-08 09:53:56');
COMMIT;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` tinyint(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '标签名称',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
BEGIN;
INSERT INTO `tags` VALUES (1, 'js', '2018-09-20 08:21:20', '2018-09-20 08:21:20');
INSERT INTO `tags` VALUES (2, 'vue', '2018-09-20 11:54:53', '2018-09-20 11:54:52');
INSERT INTO `tags` VALUES (3, 'node', '2018-09-20 11:54:55', '2018-09-20 11:54:54');
INSERT INTO `tags` VALUES (4, 'css', '2018-09-20 11:54:57', '2018-09-20 11:54:56');
INSERT INTO `tags` VALUES (5, 'html', '2018-09-20 11:54:59', '2018-09-20 11:54:58');
INSERT INTO `tags` VALUES (10, '潜潜潜', '2018-09-20 08:41:11', '2018-09-20 08:41:11');
INSERT INTO `tags` VALUES (17, '欣欣欣', '2018-09-21 03:12:35', '2018-09-21 03:12:35');
INSERT INTO `tags` VALUES (18, 'wtff', '2018-09-21 07:49:33', '2018-09-21 07:49:33');
INSERT INTO `tags` VALUES (20, 'vpn', '2018-10-08 09:54:52', '2018-10-08 09:54:52');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `uname` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名成',
  `real_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '用户真名',
  `pwd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '用户类型',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系号码',
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '联系邮箱',
  `enable` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用',
  `remark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `update_item` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (4, 'qianqian', '潜', 'qianqian', 1, '17632389324', '7827343274@qq.com', 1, 'test', '2018-10-01 21:21:16', '2018-10-01 21:21:12');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
