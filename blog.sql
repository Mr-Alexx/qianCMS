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

 Date: 06/08/2018 23:42:47
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
  `source` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源 原创/参考/转载',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示 0 隐藏 1显示',
  `tid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '标签id',
  `tname` varchar(10) NOT NULL DEFAULT '' COMMENT '标签名',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '缩略图 路径',
  `summary` varchar(255) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新/修改时间',
  `is_delete` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否禁用: 0删除 1正常',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '访问数',
  `comments` int(5) unsigned NOT NULL DEFAULT '0' COMMENT '评论数量',
  `html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章主题内容',
  `markdown` longtext NOT NULL COMMENT '存储markdown内容',
  `smtitle` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`,`is_delete`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, 1, 'dfsf', 2, '原创', 1, 0, '', '', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', '2018-08-01 15:45:55', '2018-08-01 15:45:55', 1, 0, 0, '<pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"pun\">[</span><span class=\"lit\">1</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">3</span><span class=\"pun\">]</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"pln\">console</span><span class=\"pun\">.</span><span class=\"pln\">log</span><span class=\"pun\">(</span><span class=\"pln\">a</span><span class=\"pun\">)</span></code></li></ol></pre>\n<h2 id=\"h2-u4F60u597Du554A\"><a name=\"你好啊\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>你好啊</h2><p>嗯</p>\n', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', 'fdsafsd');
INSERT INTO `article` VALUES (2, 1, 'dfsf', 2, '原创', 1, 0, '', '', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', '2018-08-01 15:46:10', '2018-08-01 15:46:10', 1, 0, 0, '<pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"pun\">[</span><span class=\"lit\">1</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">3</span><span class=\"pun\">]</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"pln\">console</span><span class=\"pun\">.</span><span class=\"pln\">log</span><span class=\"pun\">(</span><span class=\"pln\">a</span><span class=\"pun\">)</span></code></li></ol></pre>\n<h2 id=\"h2-u4F60u597Du554A\"><a name=\"你好啊\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>你好啊</h2><p>嗯</p>\n', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', 'fdsafsd');
INSERT INTO `article` VALUES (3, 1, 'dfsf', 2, '原创', 1, 0, '', '', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', '2018-08-01 15:54:42', '2018-08-01 15:54:42', 1, 0, 0, '<pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"pun\">[</span><span class=\"lit\">1</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">,</span><span class=\"pln\"> </span><span class=\"lit\">3</span><span class=\"pun\">]</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"pln\">console</span><span class=\"pun\">.</span><span class=\"pln\">log</span><span class=\"pun\">(</span><span class=\"pln\">a</span><span class=\"pun\">)</span></code></li></ol></pre>\n<h2 id=\"h2-u4F60u597Du554A\"><a name=\"你好啊\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>你好啊</h2><p>嗯</p>\n', '```javascript\nconst a = [1, 2, 3]\nconsole.log(a)\n```\n##你好啊\n嗯', 'fdsafsd');
INSERT INTO `article` VALUES (4, 1, '测试', 2, '原创', 1, 0, '', 'http://localhost:3000/upload/images/2018-08-04/1533313999646_batman.png', '这是一段测试文本，摘要要超过20个字符才行啊。。。。', '2018-08-03 16:35:10', '2018-08-03 16:35:10', 1, 0, 0, '<h2 id=\"h2-css\"><a name=\"css\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>css</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"CSS\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-css\"><span class=\"pun\">.</span><span class=\"pln\">prefix</span><span class=\"pun\">-</span><span class=\"pln\">d</span><span class=\"pun\">{</span></code></li><li class=\"L1\"><code class=\"lang-css\"><span class=\"pln\">    color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#fff;</span></code></li><li class=\"L2\"><code class=\"lang-css\"><span class=\"pln\">    background</span><span class=\"pun\">-</span><span class=\"pln\">color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#000;</span></code></li><li class=\"L3\"><code class=\"lang-css\"><span class=\"pln\">    font</span><span class=\"pun\">-</span><span class=\"pln\">size</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"lit\">14px</span><span class=\"pun\">;</span></code></li><li class=\"L4\"><code class=\"lang-css\"><span class=\"pun\">}</span></code></li></ol></pre>\n<h2 id=\"h2-js\"><a name=\"js\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>js</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"lit\">1</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"kwd\">if</span><span class=\"pln\"> </span><span class=\"pun\">(</span><span class=\"pln\">a </span><span class=\"pun\">&gt;</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">)</span><span class=\"pln\"> </span><span class=\"pun\">{</span></code></li><li class=\"L2\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"kwd\">return</span><span class=\"pln\"> </span><span class=\"lit\">3</span></code></li><li class=\"L3\"><code class=\"lang-javascript\"><span class=\"pun\">}</span></code></li></ol></pre>\n<p>测试结束</p>\n', '## css\n```css\n.prefix-d{\n	color: #fff;\n	background-color: #000;\n	font-size: 14px;\n}\n```\n##js\n```javascript\nconst a = 1\nif (a > 2) {\n	return 3\n}\n```\n测试结束', '测试');
INSERT INTO `article` VALUES (5, 1, '测试', 2, '原创', 1, 0, '', 'http://localhost:3000/upload/images/2018-08-04/1533313999646_batman.png', '这是一段测试文本，摘要要超过20个字符才行啊。。。。', '2018-08-03 16:35:45', '2018-08-03 16:35:45', 1, 0, 0, '<h2 id=\"h2-css\"><a name=\"css\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>css</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"CSS\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-css\"><span class=\"pun\">.</span><span class=\"pln\">prefix</span><span class=\"pun\">-</span><span class=\"pln\">d</span><span class=\"pun\">{</span></code></li><li class=\"L1\"><code class=\"lang-css\"><span class=\"pln\">    color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#fff;</span></code></li><li class=\"L2\"><code class=\"lang-css\"><span class=\"pln\">    background</span><span class=\"pun\">-</span><span class=\"pln\">color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#000;</span></code></li><li class=\"L3\"><code class=\"lang-css\"><span class=\"pln\">    font</span><span class=\"pun\">-</span><span class=\"pln\">size</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"lit\">14px</span><span class=\"pun\">;</span></code></li><li class=\"L4\"><code class=\"lang-css\"><span class=\"pun\">}</span></code></li></ol></pre>\n<h2 id=\"h2-js\"><a name=\"js\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>js</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"lit\">1</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"kwd\">if</span><span class=\"pln\"> </span><span class=\"pun\">(</span><span class=\"pln\">a </span><span class=\"pun\">&gt;</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">)</span><span class=\"pln\"> </span><span class=\"pun\">{</span></code></li><li class=\"L2\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"kwd\">return</span><span class=\"pln\"> </span><span class=\"lit\">3</span></code></li><li class=\"L3\"><code class=\"lang-javascript\"><span class=\"pun\">}</span></code></li></ol></pre>\n<p>测试结束</p>\n', '## css\n```css\n.prefix-d{\n	color: #fff;\n	background-color: #000;\n	font-size: 14px;\n}\n```\n##js\n```javascript\nconst a = 1\nif (a > 2) {\n	return 3\n}\n```\n测试结束', '测试');
INSERT INTO `article` VALUES (6, 1, '测试', 2, '原创', 1, 0, '', 'http://localhost:3000/upload/images/2018-08-04/1533313999646_batman.png', '这是一段测试文本，摘要要超过20个字符才行啊。。。。', '2018-08-03 16:37:05', '2018-08-03 16:37:05', 1, 0, 0, '<h2 id=\"h2-css\"><a name=\"css\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>css</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"CSS\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-css\"><span class=\"pun\">.</span><span class=\"pln\">prefix</span><span class=\"pun\">-</span><span class=\"pln\">d</span><span class=\"pun\">{</span></code></li><li class=\"L1\"><code class=\"lang-css\"><span class=\"pln\">    color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#fff;</span></code></li><li class=\"L2\"><code class=\"lang-css\"><span class=\"pln\">    background</span><span class=\"pun\">-</span><span class=\"pln\">color</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"com\">#000;</span></code></li><li class=\"L3\"><code class=\"lang-css\"><span class=\"pln\">    font</span><span class=\"pun\">-</span><span class=\"pln\">size</span><span class=\"pun\">:</span><span class=\"pln\"> </span><span class=\"lit\">14px</span><span class=\"pun\">;</span></code></li><li class=\"L4\"><code class=\"lang-css\"><span class=\"pun\">}</span></code></li></ol></pre>\n<h2 id=\"h2-js\"><a name=\"js\" class=\"reference-link\"></a><span class=\"header-link octicon octicon-link\"></span>js</h2><pre class=\"prettyprint linenums prettyprinted\" data-rel=\"JAVASCRIPT\" style=\"\"><ol class=\"linenums\"><li class=\"L0\"><code class=\"lang-javascript\"><span class=\"kwd\">const</span><span class=\"pln\"> a </span><span class=\"pun\">=</span><span class=\"pln\"> </span><span class=\"lit\">1</span></code></li><li class=\"L1\"><code class=\"lang-javascript\"><span class=\"kwd\">if</span><span class=\"pln\"> </span><span class=\"pun\">(</span><span class=\"pln\">a </span><span class=\"pun\">&gt;</span><span class=\"pln\"> </span><span class=\"lit\">2</span><span class=\"pun\">)</span><span class=\"pln\"> </span><span class=\"pun\">{</span></code></li><li class=\"L2\"><code class=\"lang-javascript\"><span class=\"pln\">    </span><span class=\"kwd\">return</span><span class=\"pln\"> </span><span class=\"lit\">3</span></code></li><li class=\"L3\"><code class=\"lang-javascript\"><span class=\"pun\">}</span></code></li></ol></pre>\n<p>测试结束</p>\n', '## css\n```css\n.prefix-d{\n	color: #fff;\n	background-color: #000;\n	font-size: 14px;\n}\n```\n##js\n```javascript\nconst a = 1\nif (a > 2) {\n	return 3\n}\n```\n测试结束', '测试');
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '用户id',
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '栏目名称',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '栏目中文名称',
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '自栏目所属父栏目id',
  `sort` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '栏目排序 0为最底端',
  `meta_title` varchar(100) NOT NULL DEFAULT '' COMMENT '服务端渲染seo的meta title',
  `keywords` varchar(255) NOT NULL DEFAULT '' COMMENT '服务端渲染 meta 关键词描述',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '服务端渲染 meta 描述详细信息',
  `allow_publish` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否发布',
  `display` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示',
  `view` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '访问数',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` tinyint(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '标签id',
  `tname` varchar(10) NOT NULL DEFAULT '' COMMENT '标签名称',
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `uname` varchar(20) NOT NULL DEFAULT '' COMMENT '用户名成',
  `pwd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `role` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '角色 权限用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (3, 'qianqian', '123456', 0, '2018-08-03 15:22:15');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
