import React, { useState } from 'react';

// Самый популярный: Недавно добавлено: Армянский народный Давид из Сасуна
const sortsItem = [
    {name: 'Ամենաճանաչված', type: 'popular'},
    {name: 'Նոր ավելացված', type: 'date'},
    {name: 'հայ ժողովրական', type: 'peoples'},
    {name: 'Սասունցի Դավիդ', type: 'author'}
];

const SortBooks = ({sorting}) => {
    const [active, setActive] = useState(0);

    return (
        <div className="sorting">
            {sortsItem.map(({name, type}, i) => (
                <div
                    className={"sorting__item " + (active === i ? "active" : "") }
                    key={name}
                    onClick={() => {
                        sorting(type);
                        setActive(i);
                    }}
                    >
                    {name}
                </div>
            ))}
        </div>
    );
}

export default SortBooks;
