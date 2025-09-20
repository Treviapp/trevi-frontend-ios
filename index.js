import 'react-native-reanimated';  // 👈 must be first

import { registerRootComponent } from 'expo';
import Routes from './src/navigation/Routes';

registerRootComponent(Routes);