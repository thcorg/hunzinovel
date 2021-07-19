# HunziNovel - 混子小说网
[![](https://paandaa.gitee.io/2020/%E3%80%8C%E6%B7%B7%E5%AD%90%E5%B0%8F%E8%AF%B4%E7%BD%91-Hunzi-Novel%E3%80%8D%E7%8E%B0%E5%B7%B2%E4%B8%8A%E7%BA%BF/cover01.jpg)](https://paandaa.gitee.io/hunzinovel)

#### 介绍

混子小说网（Hunzi Novel）是混子群推出的在线小说阅读网站，旨在提供优质的小说。

目前本站内容包括玛丽苏、杰克苏、青春、校园、悬疑、玄幻、恐怖、言情等多种类型，覆盖 BG、BL、GL 等多种取向，致力于打造有门槛的阅读体验。

#### 基本用法

1.  下载本站源码。
2.  将书籍信息以 JSON 格式存储到 js/bookList.json。

| 键              | 值                                     |
|----------------|---------------------------------------|
| `id`           | String 书籍编号                           |
| `title`        | String 书籍标题                           |
| `subtitle`     | String 书籍副标                           |
| `author`       | String 作者名                            |
| `iscrypt`      | Boolean 是否加密                          |
| `signed`       | Boolean 作者是否为签约作者                     |
| `content`      | Array [{"chapterId", "chapterTitle"}, ...] |
| `chapterId`    | String 章节序号                           |
| `chapterTitle` | String 章节标题                           |

3.  将书籍内容以 JSON 格式存储到 js/book[id].json。

| 键              | 值                              |
|----------------|--------------------------------|
| `chapterId`    | String 章节序号                    |
| `chapterTitle` | String 章节标题                    |
| `content`      | Array [String Paragraph, ...] |

 **注意：** 若书籍`iscrypt`为`true`，请将`id`，`author`与`chapterId`外的所有内容以相同密钥进行AES加密。