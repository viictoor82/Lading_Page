from tkinter import ttk
from tkinter.ttk import*
from tkinter import*
from tkinter import messagebox

janela = Tk()
janela.title("Lista Telefonica ")
janela.geometry("630x455")
janela.configure(background="#FCFCFC")
janela.resizable(width=False,height=False)
style = Style(janela)
style.theme_use("clam")
#funções
contatos = []
def adicionar_contato():
    nome = enome.get()
    telefone = etel.get()
    endereco = eend.get()

    if nome and telefone and endereco:
        contatos.append({"Nome": nome, "Telefone": telefone, "Endereço": endereco})
        lista.insert('', 'end', values=(nome, telefone, endereco))
        messagebox.showinfo("Sucesso", "Contato adicionado!")
        enome.delete(0, END)
        etel.delete(0, END)
        eend.delete(0, END)
    else:
        messagebox.showwarning("Aviso", "Preencha todos os campos.")

def excluir_contato():
    selecionado = lista.selection()
    if selecionado:
        for item in selecionado:
            lista.delete(item)
        messagebox.showinfo("Sucesso", "Contato excluído!")
    else:
        messagebox.showwarning("Aviso", "Selecione um contato.")
def buscar_contato():
    termo = ebuscar.get()
    if termo:
        for item in lista.get_children():
            if termo.lower() in lista.item(item, 'values')[0].lower():
                lista.selection_set(item)
                lista.see(item)
                return
        messagebox.showinfo("Resultado", "Nenhum contato encontrado.")
    else:
        messagebox.showwarning("Aviso", "Insira um termo de busca.")
#frames da tela
frame_cima = Frame(janela, width=700, height=50,bg="#376af5", relief="groove")
frame_cima.grid(row=1, column=0, pady=5, padx=0, sticky=NSEW)

frame_baixo = Frame(janela, width=700, height=150,bg="#ffffff", relief="groove")
frame_baixo.grid(row=2, column=0, pady=0, padx=0, sticky=NSEW)

frame_lista = Frame(janela, width=690, height=180, bg="#ABABAB", relief="groove")
frame_lista.grid(row=3, column=0, columnspan=1, pady=0, padx=10,sticky=NSEW)

#Textos e Entradas
titulo = Label(frame_cima,text='Lista Telefonica', anchor=NE, font=('Century 20 bold'), background="#376af5", fg='#ffffff')
titulo.place(x=60,y=5)

nome = Label(frame_baixo,text='Nome', anchor=NE, font=('Century 12'), background="#ffffff", fg='#000000')
nome.place(x=10,y=15)
enome = Entry(frame_baixo,width='25',justify='left',font=('Arial 10'),highlightthickness='1')
enome.place(x=60,y=18)

tel = Label(frame_baixo,text='Tel', anchor=NE, font=('Century 12'), background="#ffffff", fg='#000000')
tel.place(x=10,y=47)
etel = Entry(frame_baixo, width='25',justify='left',font=('Arial 10'),highlightthickness='1')
etel.place(x=60,y=50)

endereco = Label(frame_baixo,text='End.', anchor=NE, font=('Century 12'), background="#ffffff", fg='#000000')
endereco.place(x=10,y=80)
eend = Entry(frame_baixo,width='25',justify='left',font=('Arial 10'),highlightthickness='1')
eend.place(x=60,y=83)

#botões configuração
buscar = Button(frame_baixo,text='Buscar', command=buscar_contato, font=('Century 10 bold'), background="#ebe9e9", fg='#000000', relief='raised')
buscar.place(x=10,y=118)
ebuscar = Entry(frame_baixo,width='25',justify='left',font=('Arial 10'),highlightthickness='1')
ebuscar.place(x=78,y=123)

adicionar = Button(frame_baixo,text='Adicionar',command=adicionar_contato, font=('Century 10 bold'), background="#3d8514", fg='#000000', relief='raised')
adicionar.place(x=275,y=15)

excluir = Button(frame_baixo,text='Excluir', command=excluir_contato, font=('Century 10 bold'), background="#d42525", fg='#000000', relief='raised')
excluir.place(x=360,y=15)


#listas de Dados

lista = ttk.Treeview(frame_lista, selectmode='browse', columns=('Nome', 'Telefone', 'Endereço'), show="headings")
barrav = ttk.Scrollbar(frame_lista, orient='vertical',command=lista.yview)
barrah = ttk.Scrollbar(frame_lista, orient='horizontal', command=lista.xview)

lista.configure(yscrollcommand=barrav.set, xscrollcommand=barrah.set)
lista.grid(column=0,row=0,sticky=NSEW)
barrav.grid(column=1,row=0,sticky=NS)
barrah.grid(column=0,row=1,sticky=EW)

lista.heading(0,text='Nome', anchor=NW)
lista.heading(1,text='Telefone', anchor=NW)
lista.heading(2,text='Endereço', anchor=NW)

print(f"lista de contatos: {contatos}")
janela.mainloop()