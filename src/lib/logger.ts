export enum LogLevel {
    debug,
    info,
    warn,
    error
}

class Logger {
    private isDev = process.env.NODE_ENV === 'development';

    private formatMessage(message: string, context?: string): string {
        const timestamp = new Date().toLocaleTimeString();
        const contextStr = context ? `[${context}]` : '';

        return `${timestamp} ${contextStr} ${message}`;
    }

    private getStyle(level: LogLevel): string {
        const styles = {
            [LogLevel.debug]: 'color: #888; font-weight: normal',
            [LogLevel.info]: 'color: #2196F3; font-weight: bold',
            [LogLevel.warn]: 'color: #FF9800; font-weight: bold',
            [LogLevel.error]: 'color: #F44336; font-weight: bold; background: #ffebee; padding: 2px 4px'
        };

        return styles[level];
    }

    debug(message: string, data?: unknown, context?: string): void {
        if (!this.isDev) {
return;
}

        const formatted = this.formatMessage(message, context);
        /* eslint-disable-next-line no-console */
        console.log(`%c🐛 ${formatted}`, this.getStyle(LogLevel.debug), data || '');
    }

    info(message: string, data?: unknown, context?: string): void {
        if (!this.isDev) {
return;
}

        const formatted = this.formatMessage(message, context);
        /* eslint-disable-next-line no-console */
        console.log(`%cℹ️ ${formatted}`, this.getStyle(LogLevel.info), data || '');
    }

    warn(message: string, data?: unknown, context?: string): void {
        const formatted = this.formatMessage(message, context);
        /* eslint-disable-next-line no-console */
        console.warn(`%c⚠️ ${formatted}`, this.getStyle(LogLevel.warn), data || '');
    }

    error(message: string, data?: unknown, context?: string): void {
        const formatted = this.formatMessage(message, context);
        /* eslint-disable-next-line no-console */
        console.error(`%c❌ ${formatted}`, this.getStyle(LogLevel.error), data || '');
    }
}

export const log = new Logger();
