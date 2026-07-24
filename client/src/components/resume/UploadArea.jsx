import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

function UploadArea({ file, setFile }) {

    return (

        <motion.label

            whileHover={{ scale: 1.02 }}

            whileTap={{ scale: 0.98 }}

            className="border-2 border-dashed border-slate-700
bg-gradient-to-br from-slate-800 to-slate-900
hover:border-blue-500
rounded-3xl
p-16
cursor-pointer
transition
shadow-2xl
flex
flex-col
items-center"

        >

            <UploadCloud
                size={60}
                className="text-blue-400"
            />

            <h2 className="text-2xl font-semibold text-white mt-6">

                Drag & Drop Resume

            </h2>

            <p className="text-slate-400 mt-2">

                or click to browse PDF

            </p>

            <input

                hidden

                type="file"

                accept=".pdf"

                onChange={(e) =>
                    setFile(e.target.files[0])
                }

            />

            {

                file && (

                    <div className="mt-8 bg-slate-700 px-5 py-3 rounded-lg text-green-400">

                        {file.name}

                    </div>

                )

            }

        </motion.label>

    );

}

export default UploadArea;