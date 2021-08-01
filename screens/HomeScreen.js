import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import PostCard from '../components/PostCard';
import { Container } from '../styles/FeedStyles'
import Icon from 'react-native-vector-icons/Ionicons';

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
    return (
        <Container>
            <FlatList
                data={Posts}
                renderItem={({ item }) => <PostCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>


    )
}

export default HomeScreen


