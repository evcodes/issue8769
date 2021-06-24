import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Auth } from '@aws-amplify/auth';


export default function Home({ updateAuthState }) {
	const [devices, setDevices] = useState([]);

	async function signOut() {
		try {
			await Auth.signOut();
			updateAuthState('loggedOut');
		} catch (error) {
			console.log('Error signing out: ', error);
		}
	}

	async function forgetDevice() {
		try {
			await Auth.forgetDevice().then(res => {
				console.log(res);
			});
		} catch (error) {
			console.log('Forgetting Device failed with error: ', error);
		}
	}

	async function listDevices() {
		try {
			const devices = await Auth.fetchDevices()
				console.log(devices);
				setDevices(devices);
			
		} catch (error) {
			console.log('Listing Device failed with error: ', error);
		}
	}

	return (
		<View style={styles.container}>
			<Text> Device Tracking Demo</Text>
			<Button title="forget device" color="tomato" onPress={forgetDevice} />
			<Button title="list devices" color="tomato" onPress={listDevices} />
			<Button title="Sign Out" color="tomato" onPress={signOut} />

			{devices.map(device => (
				<View>
					<Text>{device.id}</Text>
				</View>
			))}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 20,
	},
});
