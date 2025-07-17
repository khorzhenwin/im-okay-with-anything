# Mantine v6 to v7 Migration Notes

This document outlines the changes made to upgrade from Mantine v6 to v7.

## Major Changes

1. **Package Updates**
   - Updated all Mantine packages from v6 to v7
   - Removed @mantine/next package as it's no longer available in v7

2. **CSS Imports**
   - Added explicit CSS imports in Provider.tsx:
     ```tsx
     import '@mantine/core/styles.css';
     import '@mantine/dates/styles.css';
     import '@mantine/notifications/styles.css';
     ```

3. **MantineProvider Changes**
   - Removed `withGlobalStyles` and `withNormalizeCSS` props
   - Added `defaultColorScheme="dark"` to maintain dark mode

4. **Theme Configuration**
   - Changed from `MantineThemeOverride` to `createTheme`
   - Updated theme structure for v7

## Component Prop Changes

1. **Group Component**
   - Changed `position="right"` to `justify="flex-end"`

2. **Text Component**
   - Changed `weight` to `fw`
   - Changed `align` to `ta`

3. **Stack Component**
   - Changed `spacing` to `gap`

4. **Card Component**
   - Changed `padding` to `p`

5. **LoadingOverlay Component**
   - Removed `overlayBlur` prop

## Other Changes

1. **Styling**
   - Mantine v7 uses CSS modules instead of Emotion
   - Class names are now more consistent

2. **Polymorphic Components**
   - Updated imports and type definitions for polymorphic components

## Additional Resources

- [Official Mantine v7 Migration Guide](https://mantine.dev/guides/6x-to-7x/)