import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { BaseLayout } from '@/app/layouts/baseLayout';
import QuestsView from '@/pages/quests/view/QuestsView';
import { AboutView } from '@/pages/about-us/view';
import { PostsView } from '@/pages/posts/view';
import { TodoView } from '@/pages/todo/view/todoView';
import CardsView from '@/pages/cards/view/cardsView';
import FriendsView from '@/pages/friends/view/friendsView';
// import { SimpleLayout } from 'src/layouts/simple';

// import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// const QuestsPage = lazy(() => import('@/pages/quests/helmet'));

// const AboutPage = lazy(() => import('@/pages/about-us/helmet'));
// const TodoPage = lazy(() => import('@/pages/todo/helmet'));
// const PostsPage = lazy(() => import('@/pages/posts/helmet'));
// const CardsPage = lazy(() => import('@/pages/cards/view/cardsView'));
// const FriendsPage = lazy(() => import('@/pages/friends/helmet'));

// Posts
// const PostListPage = lazy(() => import('src/pages/post/list'));
// const PostDetailsPage = lazy(() => import('src/pages/post/details'));

// Error
// const Page500 = lazy(() => import('src/pages/error/500'));
// const Page403 = lazy(() => import('src/pages/error/403'));
// const Page404 = lazy(() => import('src/pages/error/404'));

// Blank
// const BlankPage = lazy(() => import('src/pages/blank'));

// ----------------------------------------------------------------------

export const mainRoutes = [
    {
        element: (
            // <Suspense fallback={<SplashScreen />}>
            <Suspense fallback={<div>Loading...</div>}>
                <BaseLayout>
                    <Outlet />
                </BaseLayout>
            </Suspense>
        ),

        children: [
            {
                path: 'quests',
                element: <QuestsView />,
            },
            {
                path: 'about-us',
                element: <AboutView />,
            },
            {
                path: 'posts',
                element: <PostsView />,
            },
            {
                path: 'todo',
                element: <TodoView />,
            },
            {
                path: 'cards',
                element: <CardsView />,
            },
            {
                path: 'friends',
                element: <FriendsView />,
            },
            // {
            //     path: 'post',
            //     children: [
            //         { element: <PostListPage />, index: true },
            //         { path: 'list', element: <PostListPage /> },
            //         { path: ':title', element: <PostDetailsPage /> },
            //     ],
            // },
        ],
    },
    // 
    // {
    //     path: 'maintenance',
    //     element: (
    //         <SimpleLayout content={{ compact: true }}>
    //             <MaintenancePage />
    //         </SimpleLayout>
    //     ),
    // },
    // { path: '500', element: <Page500 /> },
    // { path: '404', element: <Page404 /> },
    // { path: '403', element: <Page403 /> },

];