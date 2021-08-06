import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'

import PostCard from '../components/PostCard';
import { Container } from '../styles/FeedStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Posts = [
    {
        id: 1,
        userName: "Krishna",
        userImg: require("../assets/users/user-3.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: true,
        likes: '14',
        comments: '5'
    },
    {
        id: 2,
        userName: "Krishna",
        userImg: require("../assets/users/user-1.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: false,
        likes: '0',
        comments: '0'
    },
    {
        id: 3,
        userName: "Krishna",
        userImg: require("../assets/users/user-3.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: 'none',
        liked: false,
        likes: '14',
        comments: '5'
    },
    {
        id: 4,
        userName: "Krishna",
        userImg: require("../assets/users/user-2.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: false,
        likes: '14',
        comments: '5'
    },
    {
        id: 5,
        userName: "Nill",
        userImg: require("../assets/users/user-4.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: true,
        likes: '14',
        comments: '5'
    },
    {
        id: 6,
        userName: "Krishna",
        userImg: require("../assets/users/user-3.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: false,
        likes: '14',
        comments: '5'
    },
    {
        id: 7,
        userName: "Raghav",
        userImg: require("../assets/users/user-4.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: true,
        likes: '14',
        comments: '5'
    },
    {
        id: 8,
        userName: "Krishna",
        userImg: require("../assets/users/user-3.jpg"),
        postTime: "4 min ago",
        post: "Hey I am using React Native for development",
        postImg: require('../assets/posts/post-1.jpg'),
        liked: true,
        likes: '14',
        comments: '5'
    },
]
const HomeScreen = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const fetchPosts = async () => {
        try {
            const list = [];

            await firestore()
                .collection('posts')
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {
                    // console.log('Total Posts: ', querySnapshot.size);

                    querySnapshot.forEach((doc) => {
                        const {
                            userId,
                            post,
                            postImg,
                            postTime,
                            likes,
                            comments,
                        } = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            userName: 'Test Name',
                            userImg:
                                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                            postTime: postTime,
                            post,
                            postImg,
                            liked: false,
                            likes,
                            comments,
                        });
                    });
                });

            setPosts(list);

            if (loading) {
                setLoading(false);
            }

            console.log('Posts: ', posts);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            { cancelable: false },
        );
    };

    const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);

        firestore()
            .collection('posts')
            .doc(postId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { postImg } = documentSnapshot.data();

                    if (postImg != null) {
                        const storageRef = storage().refFromURL(postImg);
                        const imageRef = storage().ref(storageRef.fullPath);

                        imageRef
                            .delete()
                            .then(() => {
                                console.log(`${postImg} has been deleted successfully.`);
                                deleteFirestoreData(postId);
                            })
                            .catch((e) => {
                                console.log('Error while deleting the image. ', e);
                            });
                        // If the post image is not available
                    } else {
                        deleteFirestoreData(postId);
                    }
                }
            });
    };

    const deleteFirestoreData = (postId) => {
        firestore()
            .collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
                setDeleted(true);
            })
            .catch((e) => console.log('Error deleting posst.', e));
    };


    const ListHeader = () => {
        return null;
    };
    return (
        <Container>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard item={item} onDelete={handleDelete} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>


    )
}

export default HomeScreen


