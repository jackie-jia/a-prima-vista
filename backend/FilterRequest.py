class FilterRequest:
    def __init__(self, filters):
        self.periods = filters["periods"]
        self.instruments = filters["instruments"]
    