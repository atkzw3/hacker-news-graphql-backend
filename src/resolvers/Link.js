// 投稿情報をまとめる
function postedBy(parent, args, context){

  // parentは、
  return context.prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).postedBy();
  // postedBy はスキーマで定義したLinkモデルのデータ。取得するときは、関数で取得する。
}

module.exports = {
  postedBy,
}
