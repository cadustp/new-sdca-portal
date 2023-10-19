export type FormatMessage = (
  messageConfig: { id: string; defaultMessage?: string },
  wildCards?: { [key: string]: string },
) => string;

export type Intl = { formatMessage: FormatMessage; locale: string };

export type HistoryType = { push: (route: string) => void };

export type ModalMessagesType = {
  success: string;
  error: string;
};
