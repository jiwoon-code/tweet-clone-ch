import type { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useMutation from "../../lib/useMutation";
import { cls } from "../../lib/utils";

interface ProductWithUser extends Post {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  post: ProductWithUser;
  isLinked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLinked: !prev.isLinked }, false);
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };
  return (
    <Layout canGoBack>
      <div className="px-4">
        <div className="mb-8">
          <div className="relative pb-80"></div>
          <div className="flex cursor-pointer py-3 border-b border-t items-center space-x-3">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.post.user?.name}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.post.tweets}
            </h1>

            <div className="flex items-center justify-between space-x-2">
              <button
                onClick={onFavClick}
                className={cls(
                  "p-2 flex items-center hover:bg-gray-100 justify-center ",
                  data?.isLinked
                    ? "text-red-400  rounded-lg shadow-sm hover:text-red-500 focus:outline-none"
                    : "text-gray-400  rounded-lg shadow-sm hover:text-red-500  focus:outline-none  "
                )}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
