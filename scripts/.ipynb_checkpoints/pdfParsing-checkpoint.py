import pandas as pd
import re
from pypdf import PdfReader


class Parser:
    """
    A class used to parse agreement pdf files from assist.org

    ...

    Attributes
    ----------
    id : str
        the id of the agreement being parsed
    filename : str
        the location and name of the .pdf file to be parsed
    reader : PdfReader
        PdfReader object from the pypdf library
    ...

    Methods
    -------
    set_id(id)
        Setter method for the id
    parse()
        Parses file and creates a .txt file with class articulation formatted in JSON 
    """

    def __init__(self, id):
        self._id = id
        self._filename = "./pdfs/" + str(id) + ".pdf"
        self._reader = PdfReader(self._filename)

    def parse(self):
        """
        """
        conjunctions = ['←', 'And', 'Or']
        parts = []

        def visitor_body(text, cm, tm, font_dict, font_size):
            text = text.replace('\u200b', '').strip()
            if text and text != '\n' and text != ' ':
                if font_dict['/BaseFont'] == '/SegoeUIBold' and re.match('^(\S+\s)+\d+\w*$', text):
                    parts.append([text, 0])
                elif font_dict['/BaseFont'] == '/SegoeUIRegular' and re.match('^(\S+\s)+\(\d+\.\d+\)$', text):
                    parts.append([text, 2])
                elif font_size == 19.0 and font_dict['/BaseFont'] == '/SegoeUIRegular':
                    parts.append([text, 1])
                elif text in conjunctions:
                    parts.append([text, 3])

        for page in self._reader.pages:
            page.extract_text(visitor_text=visitor_body)

        print(*parts, sep='\n')

        state = 0
        for i in parts:
            val = i[0]
            step = i[1]

    def set_id(self, id):
        """
        Setter function for id parameter

        ...

        Parameters
        ----------
        id : str
            id number for desired agreement

        ...

        Raises
        ------
        TypeError
            If type of id is not str
        """
        if isinstance(id, str):
            self._id = id
            self._filename = "./pdfs/" + str(id) + ".pdf"
        else:
            raise TypeError("This ID is not a string.")


thing = Parser("26088890")
thing.set_id("26088890")
thing.parse()
