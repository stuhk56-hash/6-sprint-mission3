import prisma from "../lib/prisma-client.js";

// 게시물 좋아요 생성
export async function likePost(userId: number, postId: number) {
  return (prisma as any).like.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
    },
  });
}

// 좋아요 취소
export async function unlikePost(userId: number, postId: number) {
  return (prisma as any).like.deleteMany({
    where: {
      userId: userId,
      postId: postId,
    },
  });
}

// 특정 게시물 좋아요 목록
export async function getLikesByPost(PostId: number) {
  return (prisma as any).like.findMany({
    where: { PostId },
    include: { user: true },
  });
}

// 특정 유저가 누른 좋아요 목록
export async function getLikesByUser(userId: number) {
  return (prisma as any).like.findMany({
    where: { userId },
    include: { post: true },
  });
}

// 게시물의 좋아요 수
export async function countLikes(postId: number) {
  return (prisma as any).like.count({
    where: { postId },
  });
}

// 유저가 특정 게시물 좋아요 눌렀는지 여부
export async function hasUserLikedPost(userId: number, postId: number) {
  const like = await (prisma as any).like.findUnique({
    where: {
      userId_postId: { userId, postId },
    },
  });
  return like !== null;
}

// 좋아요 많은 게시물 조회
export async function getMostLikedPosts(limit = 10) {
  return (prisma as any).post.findMany({
    orderBy: {
      likes: { _count: "desc" },
    },
    take: limit,
    include: {
      _count: { select: { likes: true } },
    },
  });
}

// 유저가 좋아요 누른 게시물 전체 조회
export async function getUserLikedPosts(userId: number) {
  return (prisma as any).post.findMany({
    where: {
      likes: { some: { userId } },
    },
    include: { likes: true },
  });
}

// 좋아요 상세 조회
export async function getLikeDetails(likeId: number) {
  return (prisma as any).like.findUnique({
    where: { id: likeId },
    include: { user: true, post: true },
  });
}
