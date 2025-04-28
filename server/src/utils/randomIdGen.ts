export const randomIdGen = () => {
    const id = Math.random().toString(36).substring(2, 8);
    return id;
}