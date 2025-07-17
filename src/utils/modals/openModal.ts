"use client";

import { modals as allModals } from "./modals";
import { modals } from "@mantine/modals";
import { ModalInnerProps, ModalType } from "./types";
import { Box } from "@mantine/core";

interface OpenModalProps<T extends ModalType> {
  type: T;
  innerProps: ModalInnerProps[T];
  closeAll?: boolean;
}

function openModal<T extends ModalType>({
  type,
  innerProps,
  closeAll = false,
}: OpenModalProps<T>) {
  const modalProperties = allModals[type].properties;
  if (closeAll) {
    modals.closeAll();
  }
  modals.openContextModal({
    padding: 0,
    modal: type,
    innerProps,
    closeButtonProps: { size: 28 },
    radius: "lg",
    centered: true,
    scrollAreaComponent: Box as any,
    ...modalProperties,
    styles: {
      header: { position: 'absolute', background: 'transparent', top: '4px', right: '4px' },
      close: { background: 'transparent', color: 'black', '&:hover': { color: '#333' } },
      inner: { overflow: 'hidden' },
      content: { overflow: 'hidden', backgroundColor: '#1A1B1E' },
      ...modalProperties?.styles,
    },
  });
}

export default openModal;
