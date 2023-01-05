function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

//module.exportsで、どこでもfeedというメソッドを使えるようにする
module.exports = {
  feed,
};