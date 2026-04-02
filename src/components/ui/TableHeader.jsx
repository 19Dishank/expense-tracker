export const TableHeader = ({ title, align = "left" }) => {
    return (
        <th className={`px-4 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50/50 border-b border-gray-100 text-${align}`}>
            {title}
        </th>
    );
}