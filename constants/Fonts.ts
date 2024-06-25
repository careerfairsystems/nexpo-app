import { Platform } from "react-native";

export default {
    MyriadProRegular: Platform.select({
        ios: 'MyriadPro-Regular',
        android: 'MyriadPro-Regular', // On Android, you typically don't need the file extension
      }),
      MyriadProBold: Platform.select({
        ios: 'MyriadPro-Bold',
        android: 'MyriadPro-Bold',
      }),
};
