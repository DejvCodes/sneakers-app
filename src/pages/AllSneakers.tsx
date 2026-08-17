import {useState, useEffect} from "react";
import type {Sneaker} from "../types/types";
import sneakers from '../data/sneakers-app-data';
import OneSneakers from "../components/OneSneaker";

const SneakersApp = () => {
  const [searchingSneakers, setSearchingSneakers] = useState<string>('');
  const [filteredSneakers, setFilteredSneakers] = useState<Sneaker[]>(sneakers);

  useEffect(() => {
    if (!searchingSneakers) {
      setFilteredSneakers(sneakers);
      return;
    }

    const sneakersAfterFilter = sneakers.filter(({ fullName, brand }) => {
      const term = searchingSneakers.toLowerCase();
      return fullName.toLowerCase().includes(term) || brand.toLowerCase().includes(term);
    })

    setFilteredSneakers(sneakersAfterFilter);
  }, [searchingSneakers]);

  return <section className="min-h-screen flex justify-center">
    <div className="container">
      <h2 className="text-h2 tracking-wide font-medium my-4!">
        Vyhledat tenisky
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <input
          type="text"
          placeholder="Vyhledat tenisky..."
          autoComplete="off"
          value={searchingSneakers}
          onChange={(e) => setSearchingSneakers(e.target.value)}
          className="input"
        />
      </form>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredSneakers.length > 0 ? (
          filteredSneakers.map((oneSneaker: Sneaker) => {
            return <OneSneakers key={oneSneaker.id} {...oneSneaker} />
          })
        ) : (
          <div className="no-results">
            <p>Tenisky nebyly nalezeny</p>
          </div>
        )}
      </div>
    </div>
  </section>
};

export default SneakersApp;
