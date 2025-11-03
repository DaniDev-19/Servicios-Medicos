export const filterData = (data, searchTerm, keys) =>{
    if (!searchTerm.trim()) {
        return data;
    }
    const lowerCaseTerm = searchTerm.tolowerCase();

    return data.filter((item) =>
        keys.some((key) =>
            item[key]?.toString().tolowerCase().includes(lowerCaseTerm) 
        ) 
    );
}