import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";
import type { User } from "../../types/api.types";

interface ModalProps {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
}
function Modal({ selectedUser, setSelectedUser }: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        if (selectedUser) {
            ref.current?.showModal();
        }
        else {
            ref.current?.close();
        }
    }, [selectedUser]);

    function handleClose() {
        setSelectedUser(null);
    }

    return (
        <dialog ref={ref} onClose={handleClose} className="m-auto bg-transparent text-white" onClick={(e) => e.target === ref.current && handleClose()}>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-100 cursor-pointer"
                >
                    <IoClose />
                </button>
                <h2 className="text-xl font-bold mb-4">{selectedUser?.name}</h2>
                <p>
                    <strong>Email:</strong> {selectedUser?.email}
                </p>
                <p>
                    <strong>Telefone:</strong> {selectedUser?.phone}
                </p>
                <p>
                    <strong>Empresa:</strong> {selectedUser?.company?.name}
                </p>
                <p>
                    <strong>Cidade:</strong> {selectedUser?.address?.city}
                </p>
            </div>
        </dialog>
    );
}

export default Modal;