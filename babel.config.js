module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo',
        {
          unstable_transformImportMeta: true,
        },

      ],
      'nativewind/babel',  
    ],
    plugins: [
      'expo-router/babel', 
      'react-native-reanimated/plugin',
            [
        'module-resolver',
        {
          alias: {
            '@xenova/transformers': '@xenova/transformers/dist/transformers.js',
          },
        },
      ],
 
    ],
  };
};

// babel.config.js
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       [
//         'babel-preset-expo',
//         {
//           unstable_transformImportMeta: true,
//         },
//       ],
//     ],
//     plugins: [
//       'nativewind/babel',           // ← MOVED HERE (plugin, not preset)
//       'expo-router/babel',
//       'react-native-reanimated/plugin',
//       [
//         'module-resolver',
//         {
//           alias: {
//             '@xenova/transformers': '@xenova/transformers/dist/transformers.js',
//           },
//         },
//       ],
//     ],
//   };
// };

// babel.config.js
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       [
//         'babel-preset-expo',
//         {

//           unstable_transformImportMeta: true,
//         },
//       ],
//     ],
//     plugins: [
//       'nativewind/babel',           
//       'expo-router/babel',
//       'react-native-reanimated/plugin',
//     ],
//   };
// };