export class FilterListUseCase<T extends object> {
    execute(list: Array<T>, word: string): Array<T> {
        const cleaned = word.toLowerCase().trim();
        return list.filter((item) => {
            return Object.values(item).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(cleaned);
                }
                return false;
            });
        });
    }
}
